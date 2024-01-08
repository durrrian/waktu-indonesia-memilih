import Script from 'next/script'

export function GTag() {
  return (
    <>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-T5BHQ89TDJ' />
      <Script id='google-analytics'>
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
  
           gtag('config', 'G-T5BHQ89TDJ');
         `}
      </Script>
    </>
  )
}
