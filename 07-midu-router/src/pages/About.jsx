import { Link } from '../Link.jsx'

const i18n = {
  es: {
    title: 'Sobre Nosotros',
    button: 'Ir a Inicio',
    description: 'Hola, me llamo Carlos Navas y estoy creando un clon de React Router'
  },
  en: {
    title: 'About Us',
    button: 'Go to Home',
    description: 'Hi, my name is Carlos Navas and I\'m creating a React Router clone'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n['en']
}

export default function About({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')
  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img src='https://media.licdn.com/dms/image/v2/D4D03AQF1SEng--ftYQ/profile-displayphoto-crop_800_800/B4DZqEyPx1GQAI-/0/1763164357857?e=1769040000&v=beta&t=iMb5LymKZaMnwE1Gd7o41T3dViZ_38pbC3CV4ZaTrwY' alt='Logo' />
        <p>{i18n.description}</p>
      </div>
      <Link to="/">{i18n.button}</Link>
    </>
  )
}