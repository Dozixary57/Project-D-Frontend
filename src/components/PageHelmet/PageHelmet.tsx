import { Helmet } from "react-helmet-async";


const PageHelmet = ({ title }: { title: string }) => {

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title} | Project D</title>
    </Helmet>
  )
}

export default PageHelmet;