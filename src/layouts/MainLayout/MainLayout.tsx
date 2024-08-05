import Header from '~/components/Header'
import HiddenMessageFix from '~/components/MessageFixed/HiddenMessageFix'
import MessageFixed from '~/components/MessageFixed/MessageFixed'
import Sidebar from '~/components/Sidebar'
import useMessageFixStore from '~/store/messageFix.store'

interface Props {
  children: React.ReactNode
}

function MainLayout({ children }: Props) {
  const url = window.location.href
  const checkUrlMesage = url.split('/').includes('message')
  const { messagesFix, hiddenMessageFix, setMessageFix } = useMessageFixStore()
  return (
    <>
      {messagesFix.length > 0 && !checkUrlMesage && (
        <div className='fixed bottom-0 right-20 z-50 flex h-[450px] w-fit flex-row gap-4'>
          {messagesFix.slice(0, 3).map((message_fix, index) => (
            <MessageFixed key={index} message_fix={message_fix} />
          ))}
        </div>
      )}
      {hiddenMessageFix.length > 0 && !checkUrlMesage && (
        <div className='fixed bottom-10 right-1 z-50 flex h-fit flex-col gap-2'>
          {hiddenMessageFix.map((message_fix, index) => (
            <HiddenMessageFix key={index} message_fix={message_fix} />
          ))}
        </div>
      )}
      <Header />
      <Sidebar />
      <main
        id='site__main'
        className='mt-[--m-top]  h-[calc(100vh-var(--m-top))] p-2.5 xl:ml-[--w-side-sm] 2xl:ml-[--w-side]'
      >
        {children}
      </main>
    </>
  )
}

export default MainLayout
