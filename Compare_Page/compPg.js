// THÔNG SỐ KỸ THUẬT
let p = {
    'name': 'Vy Nguyen',
    'title': 2864
}

function renderInforTable(product) {
    let html = "";
    html +=
        `<h2 class="infor-header card-title">Thông số kỹ thuật</h2>
            <table class="table table-striped table-bordered">
                <colgroup>
                    <col span="1" style="width: 15%;">
                    <col span="1" style="width: 35%;">
                </colgroup>
                <tbody>`
    for (let x in product) {
        html +=
            `<tr>
                        <th scope="row">${x}</th>
                        <td>${product[x]}</td>
                    </tr>`
    }
    html +=
        `</tbody>
            </table>`

    document.getElementById('add-infor-table').innerHTML = html;
}

renderInforTable(p)

// SHOW HÌNH ẢNH
let proImgs = [
    "https://salt.tikicdn.com/ts/product/4c/33/72/090b670377d03c35d649a6bbb0b9e965.png",
    "https://salt.tikicdn.com/ts/product/5e/c5/84/47892125f263bd2888ddae035f30c84b.jpg",
    "https://salt.tikicdn.com/ts/product/4a/e9/77/4dabd10f3d105ffed00698c0266e4737.jpg",
    "https://salt.tikicdn.com/ts/product/f0/07/f8/4bda2dc725a00f187001811f978d3a47.jpg"
]

function renderImgShow(proImgs) {
    let html = "";
    
    html += 
        `<div class="mt-4 w3-content">
            <div class="row ms-0 show-img" style="width: 100%; height: 300px; overflow: hidden;">
                <img class="rounded-5 mySlides" src=${proImgs[0]} style="width:100%; height: 100%; ">`
    
    for (let x = 1; x < proImgs.length; x++) {
        html += 
                `<img class="rounded-5 mySlides" src=${proImgs[x]} style="width:100%; height: 100%; display:none">`
    }
  
    html += 
            `</div>`

    html +=
            `<div class="row ms-0 w3-section" style="width: 100%; height: 50px">`
  
    for (let x = 0; x < proImgs.length; x++) {
        html +=
                `<img class="demo rounded-3 w3-opacity w3-hover-opacity-off" src=${proImgs[x]} style="height: 100%; width:20%; cursor:pointer" onclick="currentDiv(${x+1})">`
    }
    
    html += 
            `</div>
        </div>`

    // console.log(html);
    document.getElementById("add-imgs-show").innerHTML = html;
}

function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    let i;
    let x = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-opacity-off";
}

renderImgShow(proImgs)