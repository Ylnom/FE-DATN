interface Props {
  title: string
  description: string
  textBtn: string | undefined
  onClose: () => void
  callback: (() => void) | undefined
}

function SuccessDialog({ title, description, textBtn, onClose, callback }: Props) {
  return (
    <>
      <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 md:max-w-lg'>
        <div className='flex'>
          <div
            className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full'
            style={{ backgroundColor: 'rgb(220, 252, 231)' }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='rgb(22, 163, 74)'
              aria-hidden='true'
              className='h-6 w-6'
            >
              <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5'></path>
            </svg>
          </div>
          <div className='mt-3 flex-1 text-center sm:ml-4 sm:mt-0 sm:text-left'>
            <h3 className='text-base font-semibold leading-6 text-gray-900' id='modal-title'>
              {title}
            </h3>
            <div className='mt-2'>
              <p className='pr-4 text-sm text-gray-500'>{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
        <button
          onClick={callback}
          type='button'
          className='inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto'
        >
          {textBtn}
        </button>
        <button
          onClick={onClose}
          type='button'
          className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
        >
          Quay lại
        </button>
      </div>
    </>
  )
}

export default SuccessDialog
