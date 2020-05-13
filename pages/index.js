import { Avatar, Card, ResourceItem, ResourceList, TextStyle, Heading, Page } from "@shopify/polaris";
import fetch from "isomorphic-unfetch"
import axios from "axios"
require('es6-promise').polyfill();

const domain = process.env.SHOP
const Index = (props) => {

  // let state = {

  // }

  // const getProducts = () => {

  //   return 

  // }

  return (
    <div>

      <h3>You're at the index / </h3>

      {props.products.map(item => {
        return (
          <div>

            <li>{item.title}</li>
            <li>{item.handle}</li>
            <li>{item.admin_graphql_api_id}</li>

          </div>
        )
      })}

    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch("https://" + domain + "/admin/api/2020-04/products.json", {
    method: 'get',
    headers: new Headers({
      "Host": domain,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      "DNT": "1",
      "Connection": "keep-alive",
      "Cookie": "_secure_admin_session_id_csrf=ec6af465342996132608604ad6e976e6; _secure_admin_session_id=ec6af465342996132608604ad6e976e6; _master_udr=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxrWXpVMllqSTRaUzB3TnpkbExUUXpOR0l0WVdNM1l5MWtNamsyTUdaa01HUmtOREVHT2daRlJnPT0iLCJleHAiOiIyMDIyLTA1LTEyVDA2OjM1OjA3LjE3MVoiLCJwdXIiOiJjb29raWUuX21hc3Rlcl91ZHIifX0%3D--12bcad0d536a5df7675039599efe8d08632a85ed; new_admin=1; koa.sid.sig=9kGT0zgh3XAcee2m854N-mpqupY; koa.sid=pOsHs_t542OJ4blQk_-naqg8mFQ3RBRl; new_theme_editor_disabled.sig=c0lGzzh0MFBQ5fCQTfz7yqvtriw; new_theme_editor_disabled=1; __cfduid=d64c075d57580fcc1bbeb011bb47931331589332372; _y=7bf6092b-4357-48e4-b641-0191cd302666; _orig_referrer=https%3A%2F%2Fpartners.shopify.com%2F; _landing_page=%2Fadmin; _shopify_y=7bf6092b-4357-48e4-b641-0191cd302666; __ssid=4dc32264-dee4-4d9b-a4ad-98d87cc9667f; secure_customer_sig=; cart_sig=; _shopify_fs=2020-05-12T10%3A01%3A01.669Z; _ab=1; cookietest=1",
      "Upgrade-Insecure-Requests": "1",
      "Cache-Control": "max-age=0"
    }),
    body: 'please send some data'
  })

  const data = await res.json()

  console.log(await data)

  return data
}



export default Index