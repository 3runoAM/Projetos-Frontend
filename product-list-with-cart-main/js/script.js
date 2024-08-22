const productsContainer = document.getElementById("products-grid");

/* Cria e popula a lista de produtos a partir do JSON */
const productList = [];
fetch("data.json")
    .then(response => response.json())
    .then(productInfo => {
        productInfo.forEach(product => {
            productList.push(new Product(
                product.name,
                product.category,
                product.price,
                product.image.thumbnail,
                product.image.mobile,
                product.image.tablet,
                product.image.desktop
            ));
        });
        createProductElements(productList, productsContainer);
    })
    .catch(err => console.log(err));
/*------------*/


/*------Definição de funções------*/
function Product(name, category, price, thumbnailPicPath, mobilePicPath, tabletPicPath, desktopPicPath) {
    this.name = name;
    this.price= price;
    this.category = category;
    this.thumbnailPicPath = thumbnailPicPath;
    this.mobilePicPath = mobilePicPath;
    this.tabletPicPath = tabletPicPath;
    this.desktopPicPath = desktopPicPath;
}

function createProductElements(productList, productsContainer){
    const availableProductsFragment = document.createDocumentFragment();
    productList.forEach(product => {
        const individualProductContainer = document.createElement('div');
        individualProductContainer.classList.add('individual-product-container');

        const picture = document.createElement('picture');
        picture.classList.add("product-picture");

        const srcDesktop = document.createElement('source');
        srcDesktop.media = "(min-width: 1440px)";
        srcDesktop.srcset = product.desktopPicPath;

        const srcTablet = document.createElement('source');
        srcDesktop.media = "(min-width: 778px)";
        srcDesktop.srcset = product.tabletPicPath;

        const srcMobile = document.createElement('source');
        srcMobile.media = "(min-width: 375px)";
        srcMobile.srcset = product.mobilePicPath;

        const img = document.createElement('img');
        img.src = product.desktopPicPath;
        img.alt = product.name;

        picture.appendChild(srcDesktop);
        picture.appendChild(srcTablet);
        picture.appendChild(srcMobile);
        picture.appendChild(img);

        const input = document.createElement('input');
        input.id = `${product.name.toLowerCase().replace(/\s+/g, '-')}-quantity-input`;
        input.type = "number"

        const label = document.createElement('label');
        label.classList.add("hidden-label");
        label.htmlFor = input.id;
        label.textContent = "Product quantity";

        const productCategory = document.createElement('p');
        productCategory.textContent = product.category

        const productName = document.createElement('p');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = product.price.toFixed(2);

        individualProductContainer.appendChild(picture);
        individualProductContainer.appendChild(label);
        individualProductContainer.appendChild(input);
        individualProductContainer.appendChild(productCategory);
        individualProductContainer.appendChild(productName);
        individualProductContainer.appendChild(productPrice);

        availableProductsFragment.appendChild(individualProductContainer);
    });

    productsContainer.appendChild(availableProductsFragment);
}
/*-----------------------*/
