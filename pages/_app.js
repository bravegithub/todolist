import '@/styles/globals.css'
import '../styles/fonts.css'
import 'tailwindcss/tailwind.css';
export default function App({ Component, pageProps }) {

  return (
    <div className="font-quicksand">
      <Component {...pageProps} />
    </div>
  )
}
