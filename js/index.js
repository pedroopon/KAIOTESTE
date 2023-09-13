

const loadingElement = document.querySelector("#loading")
const postscontainer = document.querySelector("#posts-container")
const botao = document.querySelector("#botaobuscar")
const url = "https://jsonplaceholder.typicode.com/posts"

//pegar URL
const urlParametros = new URLSearchParams(window.location.search)
const IdPost = urlParametros.get("id")
const comentariosContainers = document.querySelector("#comentarios-containers")

/* botao.addEventListener("click", (e) => {
    buscarTodosOsPosts()
 }) */

if (!IdPost) {
    buscarTodosOsPosts()
} else {
 BuscarPostEspecifico(IdPost)
}

async function buscarTodosOsPosts() {
    const resposta = await fetch(url)
    console.log(resposta)

    const data = await resposta.json()
    console.log(data)


    loadingElement.classList.add("hide")

    data.map((postagem) => {
        const div = document.createElement("div")
        const title = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")

        title.innerText = postagem.title
        body.innerText = postagem.body
        // como se tivese criando uma tag de link no html, so que usaando o JS e no automatico
        link.innerText = "ler"
        link.setAttribute("href", './post.html?id=' + postagem.id)

        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)
        postscontainer.appendChild(div)


    })

}

async function BuscarPostEspecifico(id) {
    const repostaPost = await fetch (`${url}/${id}`) //(url + "/")
    const respostacomentario = await fetch (`${url}/${id}/comments`)

    const dataPostagem = await repostaPost.json() 
    const datacomentario = await respostacomentario.json()

    const title = document.createElement("h1")
    const body = document.createElement("p")

    title.innerText = dataPostagem.title
    body.innerText = dataPostagem.body
    loadingElement.classList.add("hide")

    postscontainer.appendChild(title)
    postscontainer.appendChild(body)

    datacomentario.map((comentario) => {
        criarComentarios(comentario)
    })


}

function criarComentarios(comentario) {
    const divComentario = document.createElement("div")
    const email = document.createElement("h3")
    const paragrafocomentario = document.createElement("p")

    email.innerText = comentario.email
    paragrafocomentario.innerText = comentario.body

    divComentario.appendChild(email)
    divComentario.appendChild(paragrafocomentario)
    comentariosContainers.appendChild(divComentario)
}