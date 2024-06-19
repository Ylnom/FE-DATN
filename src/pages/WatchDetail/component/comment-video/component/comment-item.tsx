import { IonIcon } from '@ionic/react'
import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import commentVideoApi from '~/apis/comment-video.api'
import likeVideoApi from '~/apis/like-video.api'
import { useConfirm } from '~/components/design-systems/comfirm/confirm-provider'
import { cn } from '~/helpers'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'
import useAuthStore from '~/store/auth.store'

interface CommentItemProps {
  commentPartents: Omit<CommentVideoItem, 'children_count'>[] | undefined
  comment: CommentVideoItem
  handClickReply: (parent_id: string, reply_id: string, reply_name: string) => void
  refetchComment: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<CommentVideoItem[], Error>>
}

const CommentItem = ({ commentPartents, refetchComment, comment, handClickReply }: CommentItemProps) => {
  const [openActionComment, setOpenActionComment] = useState<boolean>(false)

  const { profile } = useAuthStore()

  const refActionComment = useRef(null)

  const coreConfirm = useConfirm()

  useOnClickOutside(refActionComment, () => {
    setOpenActionComment(false)
  })

  const { mutate: deleteCommentPartent } = useMutation({
    mutationFn: async () => {
      const res = await commentVideoApi.deleteCommentVideo(comment.id)
      return res.data.data
    },
    onSuccess: (data) => {
      refetchComment()
      return data
    }
  })

  const handleClickDeleteComment = () => {
    coreConfirm({
      title: 'Xóa bình luận?',
      confirmOk: 'Xóa',
      confirmCancel: 'Không',
      content: 'Bạn có chắc chắn muốn xóa bình luận này không?',
      callbackOK: () => {
        deleteCommentPartent()
      }
    })
  }

  const { mutate: handlePatchLikeVideo } = useMutation({
    mutationFn: async ({ video_id, comment_id }: { video_id: string; comment_id: string }) => {
      const res = await likeVideoApi.pathLikeVideo(video_id, comment_id)
      return res.data
    },
    onSuccess: () => {}
  })

  const heightBrear = commentPartents ? 'calc(100% - 60px)' : 'calc(100% - 61px)'

  return (
    <>
      {comment.reply_count > 0 && (
        <div
          className={cn('absolute left-[23px] top-[32px] w-[1px] bg-[#F0F2F5]')}
          style={{
            height: heightBrear
          }}
        ></div>
      )}
      <div className='flex items-start space-x-2 px-2'>
        <img src={comment?.user?.Profile.cover_photo} alt='profile' className='h-8 w-8 rounded-full' />
        <div className='group flex max-w-max gap-2'>
          <div className=''>
            <div className='w-[350px] rounded-lg bg-gray-100 px-3 py-2'>
              <span className='text-[13px] font-bold text-black'>{comment?.user?.first_name}</span>
              <div className='text-sm font-normal text-[#050505]'>{comment?.content}</div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-1 px-4 pt-1 text-[12px]'>
                <span>16 giờ</span>
                <button
                  className={cn(
                    'relative flex items-center gap-x-2 rounded-md px-3 py-[6px] font-bold hover:underline dark:text-white',
                    {
                      'text-blue-500': comment.isLike
                    }
                  )}
                  onClick={() =>
                    handlePatchLikeVideo({
                      video_id: comment?.video_id,
                      comment_id: comment?.id
                    })
                  }
                >
                  Thích
                </button>
                <button
                  className='font-bold hover:underline'
                  onClick={() => handClickReply(comment.id, comment.user_id, comment.user.first_name)}
                >
                  Phản hồi
                </button>
              </div>
              <div className='flex gap-2 px-4 pt-1 text-[12px]'>
                {comment?.like_count > 0 && (
                  <>
                    <img
                      src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
                      alt=''
                      className='w-4'
                    />
                    {comment.like_count}
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            className={cn('relative hidden items-center pb-4 group-hover:flex', {
              flex: openActionComment
            })}
          >
            <button
              type='button'
              className='grid h-8 w-8 place-items-center rounded-full hover:bg-secondery'
              onClick={() => setOpenActionComment((prev) => !prev)}
            >
              <IonIcon className='text-xl' name='ellipsis-horizontal' />
            </button>
            {openActionComment && (
              <div
                ref={refActionComment}
                className='absolute left-1/2 top-[80%] z-50 flex w-[200px] -translate-x-[50%] flex-col gap-y-2 rounded-md bg-white py-2 shadow-md'
              >
                <div
                  className='w-full cursor-pointer px-3 py-1 font-medium text-black hover:bg-slate-200'
                  onClick={handleClickDeleteComment}
                >
                  Xóa
                </div>
                <div className='w-full cursor-pointer px-3 py-1 font-medium text-black hover:bg-slate-200'>
                  Chỉnh sửa bình luận
                </div>
                {comment.user_id !== profile?.user_id && (
                  <div className='w-full cursor-pointer px-3 py-1 font-medium text-black hover:bg-slate-200'>
                    Báo cáo bình luận
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentItem
