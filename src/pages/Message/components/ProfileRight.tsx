import { IonIcon } from '@ionic/react'
import React from 'react'

type ProfileRightProps = {
  groupImg: string
  groupName: string
  groupId: string
}

function ProfileRight({ groupImg, groupName, groupId }: ProfileRightProps) {
  return (
    <div className='rightt absolute right-0 top-0 z-10 hidden h-full w-full transition-transform'>
      <div className='uk-animation-slide-right-medium dark:bg-dark2 absolute right-0 top-0 z-50 h-screen w-[360px] border-l bg-white shadow-lg delay-200 dark:border-slate-700'>
        <div className='-mt-px h-1.5 w-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-500' />
        <div className='py-10 pt-5 text-center text-sm'>
          <img src={groupImg} className='mx-auto mb-3 h-24 w-24 rounded-full' />
          <div className='mt-8'>
            <div className='text-base font-medium text-black md:text-xl dark:text-white'>
              {' '}
              {groupName || 'Groupname'}
            </div>
          </div>
          <div className='mt-5'>
            <div className='flex items-center justify-center gap-4'>
              <div className='flex cursor-pointer items-center justify-center rounded-full bg-slate-300 p-2 hover:bg-primary-soft'>
                <IonIcon icon='person-circle-outline' className='text-[20px] ' />
              </div>
              <div className='flex cursor-pointer items-center justify-center rounded-full bg-slate-300 p-2 hover:bg-primary-soft'>
                <IonIcon icon='search-outline' className='text-[20px] ' />
              </div>
            </div>
          </div>
        </div>
        <hr className='opacity-80 dark:border-slate-700' />
        <ul className='p-3 text-base font-medium'>
          <li>
            <div className='flex w-full items-center gap-5 rounded-md p-3 hover:bg-secondery'>
              <IonIcon icon='notifications-off-outline' className='text-2xl' /> Mute Notification
              <label className='switch ml-auto cursor-pointer'>
                {' '}
                <input type='checkbox' defaultChecked />
                <span className='switch-button !relative' />
              </label>
            </div>
          </li>
          <li>
            {' '}
            <button type='button' className='flex w-full items-center gap-5 rounded-md p-3 hover:bg-secondery'>
              {' '}
              <IonIcon icon='flag-outline' className='text-2xl' /> Report{' '}
            </button>
          </li>
          <li>
            {' '}
            <button type='button' className='flex w-full items-center gap-5 rounded-md p-3 hover:bg-secondery'>
              {' '}
              <IonIcon icon='settings-outline' className='text-2xl' /> Ignore messages{' '}
            </button>{' '}
          </li>
          <li>
            {' '}
            <button type='button' className='flex w-full items-center gap-5 rounded-md p-3 hover:bg-secondery'>
              {' '}
              <IonIcon icon='stop-circle-outline' className='text-2xl' /> Block{' '}
            </button>{' '}
          </li>
          <li>
            {' '}
            <button
              type='button'
              className='flex w-full items-center gap-5 rounded-md p-3 text-red-500 hover:bg-red-50'
            >
              {' '}
              <IonIcon icon='trash-outline' className='text-2xl' /> Delete Chat{' '}
            </button>{' '}
          </li>
        </ul>
        {/* close button */}
        <button
          type='button'
          className='absolute right-0 top-0 m-4 rounded-full bg-secondery p-2'
          uk-toggle='target: .rightt ; cls: hidden'
        >
          <IonIcon icon='close' className='flex text-2xl' />
        </button>
      </div>
      {/* overly */}
      <div
        className='absolute h-full w-full bg-slate-100/40 backdrop-blur dark:bg-slate-800/40'
        uk-toggle='target: .rightt ; cls: hidden'
      />
    </div>
  )
}

export default ProfileRight
