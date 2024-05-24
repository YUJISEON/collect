

document.addEventListener("DOMContentLoaded", (event) => {

    gsap.registerPlugin(Flip);

    const tags = gsap.utils.toArray('.tag-btn');
    const itemList  = document.querySelector('.item-list');

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



    function updateFilters(filter) {
        const items = gsap.utils.toArray('.tag-item');
        const state = Flip.getState(items); // get the current state  

        console.log(state);
        
        // adjust the display property of each item ("none" for filtered ones, "inline-flex" for matching ones)
        items.forEach(item => {
            item.style.display = item.parentElement.classList.contains(filter) == false ? "none" : "inline";
            if( item.parentElement.classList.contains(filter) ) {
                item.parentElement.classList.add('active');
            } else {
                item.parentElement.classList.remove('active');
            }
        });
        //createList(filter);
        
        // animate from the previous state
        Flip.from(state, {
            duration: 0.3,
            scale: true,
            ease: "power1.inOut",
            stagger: 0.08,
            absolute: true,
            onEnter: (elements) => {
                console.log(elements);

                gsap.fromTo("onEnter", elements, {
                    opacity: 0, 
                    scale:0
                }, {
                    opacity: 1, 
                    scale:1, 
                    duration: .3, 
                    delay: .3
                })
            },
            onLeave: (elements) => {
                console.log("onLeave", elements);

                gsap.to(elements, {
                    opacity: 0, 
                    duration: .3
                })
            }
        });
    }    

    tags.forEach( tag => {
        tag.addEventListener('click', function() {
            filter = tag.parentElement.getAttribute('data-tag');
            updateFilters(filter);
        })
    })
    
});



