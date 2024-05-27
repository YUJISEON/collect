function createList(tag = "all") {
    console.log(tag)

    itemList.innerHTML = '';

    $.ajax({
        url: "getList.json", 
        type: "GET",
        dataType: "json",
        data : {
            tags : tag
        },
        success: function (data) {
            let list = data.list;
            let htmlcon = "";

            list.forEach((item, index) => {
                let classTag = '';

                if ( item.tag.length > 1) {
                    classTag = item.tag.join(' '); 
                } else {
                    classTag = item.tag[0];
                }

                htmlcon += `
                    <li class="all ${classTag} active">
                        <a href="#" class="tag-item">
                            <img src=${item.src} alt="">
                            <div class="desc">
                                <h2>${item.title}${(index+1)}</h2>
                                <span>${item.desc}${(index+1)}</span>
                            </div>
                        </a>
                    </li>
                `;

                itemList.innerHTML = htmlcon;
            });

            
        },
        error: function (err) {
            console.log(err);
        }
    });

}