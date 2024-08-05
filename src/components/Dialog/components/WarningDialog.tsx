interface Props {
  title: string
  description: string
  textBtn: string | undefined
  onClose: () => void
  callback: (() => void) | undefined
}

function WarningDialog({ title, description, textBtn, onClose, callback }: Props) {
  return (
    <>
      <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4 md:max-w-lg'>
        <div className='sm:flex sm:items-start'>
          <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
            <svg
              className='w-6 h-6 text-red-600'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
              />
            </svg>
          </div>
          <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
            <h3 className='text-base font-semibold leading-6 text-gray-900' id='modal-title'>
              {title}
            </h3>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6'>
        <button
          onClick={callback}
          type='button'
          className='inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
        >
          {textBtn}
        </button>
        <button
          onClick={onClose}
          type='button'
          className='inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
        >
          Quay lại
        </button>
      </div>
    </>
  )
}

export default WarningDialog
