const pro1 = {
    name: "Product 1",
    img: "https://images.fpt.shop/unsafe/fit-in/240x240/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/1/26/637787904727727554_asus-tuf-gaming-fx506lh-den-2022-dd.jpg",
    price: 456789,
    cmpPg: "",
    infor: {
        'RAM': "4GB",
        'Màn hình': '15inch',
        'RA73M': "4GB",
        'Mà234n hình': '15inch',
        '24RAM': "4GB",
        'M32àn hình': '15inch'
    }
}

const pro2 = {
    name: "Product 2",
    img: "https://images.fpt.shop/unsafe/fit-in/240x240/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/9/4/637663485438013374_msi-modern-14-xam-dd.jpg",
    price: 1234567,
    cmpPg: "",
    infor: {
        'RAM': "4GB",
        'Màn hình': '15inch',
        'RA73M': "4GB",
        'Mà234n hình': '15inch',
        '24RAM': "4GB",
        'M32àn hình': '15inch'
    }
}

// THÔNG SỐ KỸ THUẬT
function renderInforTable(in4Pr1, in4Pr2) {
    let html = "";
    html +=
        `<table class="table table-striped table-bordered">
                <colgroup>
                    <col span="1" style="width: 10%;">
                    <col span="1" style="width: 45%;">
                    <col span="1" style="width: 45%;">
                </colgroup>
                <tbody>`
    
    for (let x in in4Pr1) {
        html +=
            `<tr>
                        <th scope="row">${x}</th>
                        <td>${in4Pr1[x]}</td>
                        <td>${in4Pr2[x]}</td>
                    </tr>`
    }
    html +=
        `</tbody>
            </table>`

    console.log(html);
    document.getElementById('add-infor-table').innerHTML = html;
}

renderInforTable(pro1.infor, pro2.infor)

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function renderProduct(pro, id) {
    let k = VND.format(pro.price);
    html = 
        `<h4 class="text-secondary">${pro.name}</h4>
        <img src=${pro.img} style="height: 300px; object-fit: contain">
        <div class="d-flex justify-content-between" style="width: 200px">
            <p class="text-muted">Giá chỉ từ:</p>
            <h5 class="text-danger">${k}</h5>
        </div>
        <input type="button" onclick="window.location.href=${pro.cmpPg};" value="Chi tiết" class="btn btn-success see-but" style="width: 120px"/>`
    document.getElementById(id).innerHTML = html;
}

renderProduct(pro1, "add-product-1")
renderProduct(pro2, "add-product-2")