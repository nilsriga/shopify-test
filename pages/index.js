import React, { useCallback, useState } from "react";
import {
  Card,
  Layout,
  Button,
  Modal,
  TextContainer,
  Thumbnail,
} from "@shopify/polaris";
import fetch from "isomorphic-unfetch";
require("es6-promise").polyfill();

const domain = process.env.SHOP;

const Index = async (props) => {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <div>
      <h3>App That Automatically Suggests Images For Products</h3>
      {console.log(await props)}
      {props.products.map((item, index) => {
        // const imageUrl = await getImageUrl(item.title)

        console.log(item);

        // console.log("image url", await getImageUrl(item.title));
        return (
          <Layout sectioned={true} key={1000000000 * Math.random()}>
            <Layout.Section>
              <Card>
                <h4>{item.title}</h4>
                <Thumbnail
                  size={"medium"}
                  source={item.suggestionImage}
                  // source={"https://pixabay.com/get/55e0d340485aa814f1dc84609629317b173ed7ed544c704c7d2678d0944dc65c_640.jpg"}
                  alt={item.title}
                />
                <h6>{item.admin_graphql_api_id}</h6>

                <Button onClick={handleChange}>All Info</Button>

                <div style={{ height: "100%" }}>
                  <Modal
                    open={active}
                    onClose={handleChange}
                    title={item.title}
                  >
                    <Modal.Section>
                      <TextContainer>
                        <h4>
                          {`All the information about ${item.title} with the possibly picture id @ ${item.admin_graphql_api_id}`}
                        </h4>
                        <p>{JSON.stringify(item)}</p>
                      </TextContainer>
                    </Modal.Section>
                  </Modal>
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        );
      })}
    </div>
  );
};

Index.getInitialProps = async () => {
  const productsRes = await fetch(
    "https://" + domain + "/admin/api/2020-04/products.json",
    {
      method: "get",
      headers: new Headers({
        Host: domain,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        DNT: "1",
        Connection: "keep-alive",
        Cookie:
          "_secure_admin_session_id_csrf=ec6af465342996132608604ad6e976e6; _secure_admin_session_id=ec6af465342996132608604ad6e976e6; _master_udr=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxrWXpVMllqSTRaUzB3TnpkbExUUXpOR0l0WVdNM1l5MWtNamsyTUdaa01HUmtOREVHT2daRlJnPT0iLCJleHAiOiIyMDIyLTA1LTEyVDA2OjM1OjA3LjE3MVoiLCJwdXIiOiJjb29raWUuX21hc3Rlcl91ZHIifX0%3D--12bcad0d536a5df7675039599efe8d08632a85ed; new_admin=1; koa.sid.sig=9kGT0zgh3XAcee2m854N-mpqupY; koa.sid=pOsHs_t542OJ4blQk_-naqg8mFQ3RBRl; new_theme_editor_disabled.sig=c0lGzzh0MFBQ5fCQTfz7yqvtriw; new_theme_editor_disabled=1; __cfduid=d64c075d57580fcc1bbeb011bb47931331589332372; _y=7bf6092b-4357-48e4-b641-0191cd302666; _orig_referrer=https%3A%2F%2Fpartners.shopify.com%2F; _landing_page=%2Fadmin; _shopify_y=7bf6092b-4357-48e4-b641-0191cd302666; __ssid=4dc32264-dee4-4d9b-a4ad-98d87cc9667f; secure_customer_sig=; cart_sig=; _shopify_fs=2020-05-12T10%3A01%3A01.669Z; _ab=1; cookietest=1",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "max-age=0",
      }),
      body: "please send some data",
    }
  );

  let products = await productsRes.json();

  if (await products) {
    const productsWIthImages = products.products.map(async (product) => {
      let terms = product.title;

      if (/\s/.test(terms)) {
        terms = terms.split(" ").join("+");
      }

      await fetch(
        `https://pixabay.com/api/?key=16521987-fee00b6935bf4a553c8482529&q=${terms}&image_type=photo&pretty=true`
      )
        .then((response) => {
          const imagesJson = response.json();

          return imagesJson;
        })
        .then((json) => {
          product.suggestionImage = json.hits[0].webformatURL;

          console.log(product.suggestionImage);
          return product;
        });
    });
    return productsWIthImages;
  }
};

export default Index;
