import { IonIcon } from '@ionic/react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SocketContextProvider, useSocketContext } from '~/context/socket'
import useConversationStore from '~/store/conversation.store'
import { useQueryMessage } from '../hooks/useQueryMessage'
import ChatMessage from './ChatMessage'
import PinMessage from './PinMessage'
import SendMessage from './SendMessage'
import ChatMessageSkelaton from './Skelaton/ChatMessageSkelaton'
import CustomFileInput from '~/components/InputFile/CustomFileInput'
import CallVideo from './CallVideo'
import useMessageStore from '~/store/message.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import InComingCallVideo from './InComingCallVideo'

function MessageCenter() {
  const { toggleBoxReply, togglePreviewBox, setToggleBoxSearchMessage, pinMessage, selectedConversation } =
    useConversationStore()
  const { user_id, first_name, last_name, Profile } = getProfileFromLocalStorage()
  const { isLoading, data } = useQueryMessage()
  const chatMessageRef = useRef<HTMLInputElement>(null)
  const [showScrollBtn, setShowScrollBtn] = useState<boolean>(false)
  const [callVideo, setCallVideo] = useState<boolean>(false)
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const boxReplyRef = useRef<HTMLDivElement>(null)
  const previewUploadRef = useRef<HTMLDivElement>(null)
  const infoMessage = data?.data?.data?.info
  const { onlineUsers, socket } = useSocketContext()
  const { setVideoCall, videoCall, setAcceptCall } = useMessageStore()
  const [calculateHeight, setCalculateHeight] = useState<number>(204)
  const isOnline = onlineUsers.some((user_socket) => user_socket != user_id)

  const handleScroll = useCallback(() => {
    if (chatMessageRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessageRef.current
      setShowScrollBtn(scrollHeight - scrollTop > clientHeight * 3.5)
      setIsAtBottom(scrollHeight - (scrollTop + clientHeight) < 20 ? true : false)
    }
  }, [])

  const handleClickVideoCall = () => {
    const dataToSocket = {
      group_message_id: selectedConversation?.group_id,
      user_id: user_id,
      room_id: `123${Date.now()}`,
      group_name: selectedConversation.type === 1 ? first_name + ' ' + last_name : infoMessage?.group_name,
      avatar: selectedConversation.type === 1 ? Profile.profile_picture : infoMessage?.avatar
    }
    const dataVideoCall = {
      group_message_id: selectedConversation?.group_id,
      group_name: infoMessage?.group_name,
      avatar: infoMessage?.avatar,
      user_id: selectedConversation?.id
    }

    setAcceptCall(false)
    setCallVideo(true)
    setVideoCall(dataVideoCall as {})

    socket?.emit('callVideo', dataToSocket)
  }

  useLayoutEffect(() => {
    if (toggleBoxReply || togglePreviewBox) {
      let height = 204

      if (boxReplyRef.current) {
        height = boxReplyRef.current.getBoundingClientRect().height + 195
      }

      if (previewUploadRef.current) {
        height = previewUploadRef.current.getBoundingClientRect().height + 200
      }

      setCalculateHeight(height)
    } else {
      setCalculateHeight(204)
    }
  }, [toggleBoxReply, togglePreviewBox])

  if (videoCall && Object.keys(videoCall).length > 0) {
    return <CallVideo />
  }

  if (isLoading) {
    return <ChatMessageSkelaton />
  }

  return (
    <div className='flex-1 '>
      {/* chat heading */}
      <div className='w- uk-animation-slide-top-medium relative z-10 flex  items-center justify-between gap-2 border-b px-6 py-3.5 dark:border-slate-700'>
        <div className='flex items-center gap-2 sm:gap-4'>
          {/* toggle for mobile */}
          <button type='button' className='md:hidden' uk-toggle='target: #side-chat ; cls: max-md:-translate-x-full'>
            <IonIcon icon='chevron-back-outline' className='-ml-4 text-2xl' />
          </button>
          <div
            className='relative flex-shrink-0 cursor-pointer max-md:hidden'
            uk-toggle='target: .rightt ; cls: hidden'
          >
            <img src={infoMessage?.avatar} className='h-8 w-8 rounded-full object-cover shadow' />
            {isOnline && <div className='absolute bottom-0 right-0 m-px h-2 w-2 rounded-full bg-teal-500' />}
          </div>
          <div
            className='w-[80%] cursor-pointer overflow-hidden text-ellipsis'
            uk-toggle='target: .rightt ; cls: hidden'
          >
            <p className='text-base font-bold '> {infoMessage?.group_name}</p>
            {isOnline && <div className='text-xs font-semibold text-green-500'>Đang hoạt động</div>}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          {/* Voice call */}
          <button type='button' className='button__ico'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-6 w-6'>
              <path
                fillRule='evenodd'
                d='M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          {/* Video call */}
          <button onClick={handleClickVideoCall} type='button' className='rounded-full p-1.5 hover:bg-slate-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
              />
            </svg>
          </button>
          {/* search msg */}
          <button
            onClick={() => setToggleBoxSearchMessage(true)}
            type='button'
            className='flex items-center rounded-full p-1.5 hover:bg-slate-100'
          >
            <IonIcon icon='search-outline' className='h-6 w-6' />
          </button>
          {/* option msg */}
          <button
            type='button'
            className='rounded-full p-1.5 hover:bg-slate-100'
            uk-toggle='target: .rightt ; cls: hidden'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
              />
            </svg>
          </button>
        </div>
        {/* Pin message */}
        {pinMessage && <PinMessage />}
      </div>

      {/* chats bubble */}
      <CustomFileInput setPreview={() => {}} type={3} setFile={setFile} file={file}>
        <div
          style={{
            height: `calc(100vh - ${calculateHeight}px)`
          }}
          ref={chatMessageRef}
          onScroll={handleScroll}
          className={`w-full overflow-y-auto p-5  pb-4 pt-10 
        `}
          //  md:h-[calc(100vh-204px)]
        >
          <ChatMessage showScrollBtn={showScrollBtn} isAtBottom={isAtBottom} />
        </div>
      </CustomFileInput>
      {/* sending message area */}
      <SendMessage boxReplyRef={boxReplyRef} previewUploadRef={previewUploadRef} />
    </div>
  )
}

export default MessageCenter
