const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});


const product = [
    {
        proImgURL: "https://salt.tikicdn.com/cache/750x750/ts/product/e6/d3/c9/6916b15afedb0281bd2100af2159753b.jpg.webp",
        name: "Laptop Asus ThinkBook 14s Yoga ITL i5 1135G7/16GB/512GB/14\"F/Touch/Pen/Win11/(20WE007NVN)/Xám - Hàng chính hãng",
        price: 2099000
    },
    {
        proImgURL: "https://salt.tikicdn.com/cache/750x750/ts/product/e6/d3/c9/6916b15afedb0281bd2100af2159753b.jpg.webp",
        name: "Laptop Dell ThinkBook 14s Yoga ITL i5 1135G7/16GB/512GB/14\"F/Touch/Pen/Win11/(20WE007NVN)/Xám - Hàng chính hãng",
        price: 599000
    },
    {
        proImgURL: "https://salt.tikicdn.com/cache/750x750/ts/product/e6/d3/c9/6916b15afedb0281bd2100af2159753b.jpg.webp",
        name: "Laptop Lenovo ThinkBook 14s Yoga ITL i5 1135G7/16GB/512GB/14\"F/Touch/Pen/Win11/(20WE007NVN)/Xám - Hàng chính hãng",
        price: 1099000
    },
    {
        proImgURL: "https://salt.tikicdn.com/cache/750x750/ts/product/e6/d3/c9/6916b15afedb0281bd2100af2159753b.jpg.webp",
        name: "Laptop Lenovo ThinkBook 14s Yoga ITL i5 1135G7/16GB/512GB/14\"F/Touch/Pen/Win11/(20WE007NVN)/Xám - Hàng chính hãng",
        price: 2399000
    },
    {
        proImgURL: "https://salt.tikicdn.com/cache/750x750/ts/product/e6/d3/c9/6916b15afedb0281bd2100af2159753b.jpg.webp",
        name: "Laptop Leno Hàng chính hãng",
        price: 99000
    }
]

// !async function getData() {
//     const URL = 'https://mmt-db-doan-2.vercel.app/api/website';
//     // const URL = 'https://mmt-db-doan-2.vercel.app/api/product';
//     // const URL = 'https://jsonplaceholder.typicode.com/todos/1'
//     let response = await fetch(URL, {
//         method: 'GET',
//         // mode: "no-cors",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     // .then(function(response){
//         //     return response.json();
//         // })
//         // .catch(function(err) {
//             //     console.log('Lỗi: ', err);
//             // })
//     // let response = await fetch(URL);

//     response = response.json();
//     console.log('Type of response: ', typeof response)
//     console.log('Response: ', response)
//     console.log('Status: ', response.status)
// //     // let response = await fetch(URL);
// //     // console.log(response);
// //     // response = await response.json();
// //     console.log(response)
// //     // console.log(response.data);
// }();

let perPage = document.querySelector('#mySelect option[selected]').value;
let sortOpt = document.querySelector('#sort-select option[selected]').value;
let idPage = 1;
let start = 0;
let end = perPage;
let productArr = [];

function highlightText() {
    const title = document.querySelectorAll('.get-pro-title');
    title.forEach((title, index) => {
        let titleText = title.innerHTML;
        // console.log(titleText)
        let indexOf = Number(titleText.toLocaleLowerCase().indexOf(searchText.value.toLocaleLowerCase()));
        let searchTextLength = searchText.value.length;
        titleText = titleText.substring(0, indexOf) + "<span style='background-color: #FFFF00; color: red'>" + titleText.substring(indexOf, indexOf + searchTextLength)
            + "</span>" + titleText.substring(indexOf + searchTextLength, titleText.length);
        title.innerHTML = titleText;
        // console.log(titleText);
    })
}

productArr = product;

const pageConfig = document.querySelector('.page-config select');
const sortConfig = document.querySelector('.sort-config select');
const mySelect = document.getElementById('mySelect');
const sortSelect = document.getElementById('sort-select');
const countTotalPage = document.querySelector('.total-page');
const countTotalProduct = document.querySelector('.total-item');

let totalPages = Math.ceil(productArr.length / perPage);
const searchText = document.querySelector('.searchText');
const searchBtn = document.getElementById('search');


function initRender(productAr, totalPage) {
    renderProduct(productAr);
    renderListPage(totalPage);
}

initRender(productArr, totalPages);

function getCurrentPage(indexPage) {
    start = (indexPage - 1) * perPage;
    end = indexPage * perPage;
    totalPages = Math.ceil(productArr.length / perPage);
    countTotalPage.innerHTML = `Số trang: ${totalPages}`;
    countTotalProduct.innerHTML = `Số sản phẩm:  ${productArr.length}`
}

getCurrentPage(1);

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    idPage = 1;
    productArr = [];
    product.forEach((item, index) => {
        if (item.name.toLocaleLowerCase().indexOf(searchText.value.toLocaleLowerCase()) != -1) {
            productArr.push(item);
        }
    });
    // if (productArr.length === 0) {
    //     $('.no-result').css('display', 'block')
    // } else {
    //     $('.no-result').css('display', 'none')
    // }
    getCurrentPage(idPage);
    initRender(productArr, totalPages);
    changePage();
    if (totalPages <= 1) {
        $('.btn-prev').addClass('btn-no-active');
        $('.btn-next').addClass('btn-no-active');
    } else {
        $('.btn-next').removeClass('btn-no-active');
    }
});

searchText.addEventListener("keyup", (event) => {
    // console.log(searchText.value)
    if (event.keyCode === 13) {
        event.preventDefault();
        searchBtn.click();
    }
});

pageConfig.addEventListener('change', () => {
    idPage = 1;
    perPage = Number(pageConfig.value);
    getCurrentPage(idPage);
    initRender(productArr, totalPages);
    if (totalPages == 1) {
        $('.btn-prev').addClass('btn-no-active');
        $('.btn-next').addClass('btn-no-active');
    } else {
        $('.btn-next').removeClass('btn-no-active');
    }
    changePage();
});

sortConfig.addEventListener('change', () => {
    sortOtp = Number(sortConfig.value);
    // console.log('Sort option: ', sortOtp);
    productArr = productArr.sort((a,b)=>{
        return (a.price-b.price)*sortOtp;
    })
    // for (let x of productArr) console.log(x.price)
    initRender(productArr, totalPages);
});

function renderProduct(product) {
    if (productArr.length === 0) {
        $('.no-result').css('display', 'block')
    } else {
        $('.no-result').css('display', 'none')
    }
    html = '';
    const content = product.map((item, index) => {
        if (index >= start && index < end) {
            let formatedPrice = VND.format(item.price)
            // console.log(formatedPrice)
            html +=
                `<a href="../Compare_Page/compPg.html" style="text-decoration: none;" class="col-md-12 col-lg-4 mb-4 mb-lg-0 mt-3">
                <div class="card .content__product__item">
                    <!-- <div class="d-flex justify-content-between px-3 pt-2 pb-0">
                        <p class="small"><a href="${item.proURL}" class="text-muted">${item.category}</a></p>
                        <div class="d-flex align-items-center justify-content-center shadow-1-strong"
                            style="width: 50px; height: 30px;">
                                <a href=${item.webURL}>
                                    <img style="width: 100%;"
                                        src=${item.webImgURL}>
                                </a>
                        </div> 
                    </div> -->
                    <img src=${item.proImgURL}
                        class="card-img-top" alt=${item.category} style="height: 280px"/>
                    <div class="m-3">
                        <h6 class="get-pro-title mb-3"  style="height: 100px">${item.name}</h6>

                        <div class="d-flex justify-content-between">
                            <p class="text-muted">Giá chỉ từ:</p>
                            <h5 class="text-danger">${formatedPrice}</h5>
                        </div>
                    </div>
                    <!-- <div class="ms-3 d-flex justify-content-between mb-4 me-3">
                        <form>
                            <input type="button" onclick="window.location.href='${item.proURL}';" value="So sánh" class="btn btn-danger compair-but" style="width: 120px"/>
                        </form>
                        <form>
                            <input type="button" onclick="window.location.href='${item.proURL}';" value="Chi tiết" class="btn btn-success see-but" style="width: 120px"/>
                        </form>
                    </div> -->
                </div>
            </a> `
            return html;
        }
    });
    // console.log(html);
    document.getElementById('product').innerHTML = html;
    highlightText();
}

function renderListPage(totalPages) {
    let html = '';
    html += `<li class="current-page active"><a>${1}</a></li>`;
    for (let i = 2; i <= totalPages; i++) {
        html += `<li><a>${i}</a></li>`;
    }
    if (totalPages === 0) {
        html = ''
    }
    document.getElementById('number-page').innerHTML = html;

    if (totalPages === 1) {
        document.querySelector('.page .btn-next').classList.add('btn-no-active');
    }
}

function changePage() {
    const idPages = document.querySelectorAll('#number-page li');
    const a = document.querySelectorAll('#number-page li a');
    for (let i = 0; i < idPages.length; i++) {
        idPages[i].onclick = function () {
            let value = i + 1;
            const current = document.querySelectorAll('#number-page .active');
            console.log(current);
            current[0].classList.remove('active');
            this.classList.add('active');

            $('.btn-prev').removeClass('btn-no-active');
            $('.btn-next').removeClass('btn-no-active');
            if (value == 1) $('.btn-prev').addClass('btn-no-active');
            if (value == idPages.length) $('.btn-next').addClass('btn-no-active');


            // if (value > 1 && value < idPages.length) {
            //     $('.btn-prev').removeClass('btn-no-active');
            //     $('.btn-next').removeClass('btn-no-active');
            // }
            // else if (value == 1) {
            //     $('.btn-prev').addClass('btn-no-active');
            //     $('.btn-next').removeClass('btn-no-active');
            // }
            // else if (value == idPages.length) {
            //     $('.btn-next').addClass('btn-no-active');
            //     $('.btn-prev').removeClass('btn-no-active');
            // }
            idPage = value;
            getCurrentPage(idPage);
            renderProduct(productArr);
        };
    }
}

changePage();

$('.btn-next').on('click', () => {
    idPage++;
    if (idPage > totalPages) {
        idPage = totalPages;
    }
    if (idPage == totalPages) {
        $('.btn-next').addClass('btn-no-active');
    } else {
        $('.btn-next').removeClass('btn-no-active');
    }
    console.log(idPage);
    const btnPrev = document.querySelector('.btn-prev');
    if (idPage > 1) btnPrev.classList.remove('btn-no-active');
    $('.number-page li').removeClass('active');
    $(`.number-page li:eq(${idPage - 1})`).addClass('active');
    getCurrentPage(idPage);
    renderProduct(productArr);
});

$('.btn-prev').on('click', () => {
    idPage--;
    if (idPage <= 0) {
        idPage = 1;
    }
    if (idPage == 1) {
        $('.btn-prev').addClass('btn-no-active');
    } else {
        $('.btn-prev').removeClass('btn-no-active');
    }
    const btnNext = document.querySelector('.btn-next');
    if (idPage < totalPages) btnNext.classList.remove('btn-no-active');
    $('.number-page li').removeClass('active');
    $(`.number-page li:eq(${idPage - 1})`).addClass('active');
    getCurrentPage(idPage);
    renderProduct(productArr);
});

function brandRender(brandList) {
    let html = "";
    for (let brand of brandList) {
        html += 
            `<div class="form-check">
                <input class="form-check-input" type="checkbox" value="${brand}" id="${brand}">
                <label class="form-check-label text-dark">${brand}</label>
            </div> `
    }
    // console.log(html);
    document.getElementById('add-brand-option').innerHTML = html;
}

const brandList = ["Asus", "Lenovo", "Dell"];
brandRender(brandList);


$('#add-brand-option .form-check input').change(function() {
    productArr = [];
    let cntChecked = 0;
    const brandChecked = document.querySelectorAll("#add-brand-option .form-check input");
    for (let checkbox of brandChecked) {
        if (checkbox.checked) {
            cntChecked += 1;
            let proFilter = (product.filter((item)=>{
                return item.name.toLocaleLowerCase().indexOf(checkbox.value.toLocaleLowerCase()) != -1
            }))
            for (let addPro of proFilter) {
                productArr.push(addPro);
            }
        }
    }
    if (cntChecked === 0) productArr = product;
    getCurrentPage(1);
    initRender(productArr, totalPages);
})

$('.price-option').change(function() {
    let minPr = document.getElementById('min-price').value;
    let maxPr = document.getElementById('max-price').value;

    if (minPr != "" && maxPr != "") {
        productArr = (product.filter((item)=>{
            return (item.price >= minPr) && (item.price <= maxPr);
        }))
    }

    if (minPr == "" && maxPr == "")
        productArr = product;

    getCurrentPage(1);
    initRender(productArr, totalPages);    
})
