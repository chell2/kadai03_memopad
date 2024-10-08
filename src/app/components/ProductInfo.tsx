import React from 'react';
import { saveToLocalStorage } from '@/utils/localStorageUtils';
import ProductList from '@/components/ProductList';

interface ProductInfoProps {
  product: {
    name: string;
    brewery: string;
    origin: string;
    style: string;
    hops: string;
    ABV: string;
    IBU: string;
    description: string;
    image: string;
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { name, brewery, origin, style, hops, ABV, IBU, description, image } =
    product;
  const [isExpanded, setIsExpanded] = React.useState(false);
  saveToLocalStorage({ name, brewery });
  console.log(saveToLocalStorage({ name, brewery }));

  return (
    <div id="info">
      <div className="card">
        {product ? (
          <>
            <h2 className="card-title">{name}</h2>
            <p>Brewery: {brewery}</p>
            <p>Origin: {origin}</p>
            <p>Style: {style}</p>
            <p>Hops: {hops}</p>
            <p>
              ABV: {ABV}% / IBU: {IBU}
            </p>
            <p>
              <small>
                ===== Story ========
                <br />
                {description.length > 100 ? (
                  <>
                    {isExpanded
                      ? description.split('\n').map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))
                      : description.slice(0, 100)}
                    {!isExpanded ? (
                      <span
                        className="readmore"
                        onClick={() => setIsExpanded(true)}
                      >
                        <br />
                        &nbsp;...続きを読む
                      </span>
                    ) : (
                      <span
                        className="readmore"
                        onClick={() => setIsExpanded(false)}
                      >
                        &nbsp;×閉じる
                      </span>
                    )}
                  </>
                ) : (
                  description.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                )}
              </small>
            </p>
            <img className="mask mask-squircle" src={image} alt={name} />
            <div>
              <ProductList />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
