const apiKey = '80178d7ee86d45f2ab0db47b3d24e760'

const blogContainer = document.getElementById("bolg-container");
// first time browsing.
async function fetchRandomNews()
{
    try{

        const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=40&apikey=' + apiKey;

       
        // const apiUrl = https://newsapi.org/v2/top-headlines?country=us&pageSize=40&apikey=${apiKey};
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data)
        return data.articles;

    }catch(error){
        console.error("Error fetching random news",error)
        return[];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");

        const truncatedTitle = 
            article.title.length >30
               ? article.title.slice(0,30) + "...."
                :article.title;
        title.textContent = truncatedTitle;
        
        const description = document.createElement("p");
        // nimetoa truncation ya description kwa sababu in some cases description.legth inaleta error sijui mbona but hiyo ni wewe ufind out
        const truncatedDes = article.description;

        description.textContent = truncatedDes;



        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);

        

    });
}




(async () => {


    try{
       const articles = await fetchRandomNews();
        displayBlogs(articles);

    }catch(error){
        console.error("Error fetching random news",error);

    }
}) ();