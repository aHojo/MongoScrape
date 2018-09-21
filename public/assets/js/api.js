const scrapedAppend = document.getElementsByClassName("article-container")[0];


const appendCard = function(data) {
    let container = document.createElement("div");
    let cardHead = document.createElement('div');
    let headerText = document.createElement("h3");
    let link1 = document.createElement("a");
    let link2 = document.createElement("a");
    
    container.classList.add("card");
    cardHead.classList.add("card-header");
    link1.setAttribute("href", data.url)
    link1.textContent = data.title;
    link2.classList.add("btn", "btn-success", "save");
    link2.textContent = "Save Article"
    headerText.appendChild(link1);
    headerText.appendChild(link2);
    cardHead.appendChild(headerText);
    container.appendChild(cardHead);
    scrapedAppend.appendChild(container);

};  
$(function() {
    $("#scrape-new").on("click", () => {
        const scrapeUrl = {
            "URL": "https://www.cnet.com/"
        }
        $.ajax({
            method: "POST",
            url: "/api/scrape",
            data: scrapeUrl
        }).then((response) => {
            for(let i = 0; i < response.length; i++) {
                if(response[i].title !== "") {
                    console.log(response[i]);
                    appendCard(response[i])

                }
            }
        })
      });

      $(document).on("click", ".save", function() {
          console.log($(this).prev().text());
          data = {
              headline: $(this).prev().text(),
              url: $(this).prev().attr("href")
          }

          $.ajax({
              method: "POST",
              url: "/api/save",
              data: data
          }).then(function(data) {

          });

      });

    $(document).on("click", ".delete", function() {
        const id = $(this).parent().parent().parent().attr("data-_id");

        $.ajax({
            method: "DELETE",
            url: "/api/delete/" + id
        }).then(data => {
            if(data) {
                location.reload();
            }
        });
    });

    $(document).on("click",".comments", function() {
        let comment = $(this).prev().val();
        let id = $(this).parent().parent().data("_id");
        let body = {comment, id: id };
        $(".comment-area").val("");

        console.log(comment)
        $.ajax({
            method: "POST",
            url: "/api/comment",
            data: body
        }).then(data => {
            location.reload()
            
        });
        
        
    });

    $(document).on("click", ".clear", function() {
        $.ajax({
            method: "DELETE",
            url: "/api/delete"
        }).then(data => {
            if(data) {
                location.reload();
            }
        });
    });
});
      
  
