let _user

function setUser(user){
  _user = user;
}

function getUser(){
  return _user
}

async function getCurriculoPDF(user) {
  let formacs = '';
  let xps = '';

  for(formac of user.formacs) {
    formacs += `<article class='course'>
      <div class='title'>
        <h4>` + formac.nomeEscola + `</h4>
      </div>
      <div class="descrition">
        <p>` + formac.desc + `</p>
      </div>
    </article>`
  }
  
  for(xp of user.xps) {
    xps += `<article class='course'>
      <div class='title'>
        <h4>` + xp.nomeEmpresa + `</h4>
      </div>
      <div class="descrition">
        <p>` + xp.vaga + `</p>
      </div>
    </article>`
  }

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css">
    <link rel="stylesheet" href="style.css">
  </head>
  
    <style>
      @import url('https://fonts.googleapis.com/css?family=Raleway');
  
      body {
      margin: 0;
      font-family: 'Raleway';
      font-size: 12px;
      line-height: 1em;
      heigth: 100%;
      }
      
      a {
      color: #0066cc;
      text-decoration: none;
      }
      
      article {
      padding:0 1em;
      }
      
      section{
      margin: 1em;
      }
      header, main, footer {
      margin: 0 auto;
      }
      
      header {
      padding: 1em;
      text-align: center;
      background-color: #0066cc;
      background-size: cover;
      background-position: fixed;
      color: white;
      }
      
      header section {
      margin: 0 auto;
      max-width: 640px;
      }
      
      header img {
      border-radius: 50%;
      max-width: 100px;
      }
      
      h1 {
      text-transform: uppercase;
      margin: 1em 0;
      }
      
      h3 {
      text-transform: uppercase;
      }
      
      h3, h4 {
      font-weight: bold;
      }
      
      main section:not(:last-child) {
      border-bottom: 1px solid #ccc;
      }
      
      .fab {
      border: 1px solid white;
      border-radius: 50%;
      font-size: 1.5em;
      width: 1.5em;
      height: 1.5em;
      line-height: 1.5em;
      margin: 5px;
      text-align: center;
      }
      
      a .fab {
      color: white;
      }
      
      .course, .skills {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      }
      
      .course .title {
      color: #0066cc;
      -ms-flex: 0 0 33.3%;
      flex: 0 0 33.3%;
      max-width: 33%;
      }
      
      .course .descrition {
      -ms-flex: 0 0 66.6%;
      flex: 0 0 66.6%;
      max-width: 66.6%;
      }
      
      .course .descrition p {
      padding-left: 1em;
      }
      
      footer {
      position:fixed; bottom:0px; left:0px; right:0px;border:1px solid red;
      padding: 1em 1.5em;
      background: #0066cc;
      color: white;
      text-align: right;
      }
      
      @media only screen and (max-width: 768px) {
      .course {
          display: block;
      }
      
      .course .title, .course .descrition {
          max-width: 100%;
      }
      }
      
      @media only screen and (max-width: 576px) {
      footer {
          text-align: center;
      }
      }
    </style>
  
  <body>
    <header>
      <div>
        <img src="` + user.profilePic + `" />
      </div>
      <h1>`+ user.curriculo.nome +`</h1>
      <section>
        <p>` + (user.curriculo.cidade ?? '') + ` - SP` + `</p>
        <p>` + (user.email ?? '') + (user.curriculo.wpp ? ' - (11) ' + user.curriculo.wpp : '')+ `</p>
      </section>
    </header>
    <main>` +
      (formacs ? (`<section><h3>Formação Academica</h3>` + formacs + `</section>`): '') + 
      (xps ? (`<section><h3>Experiência</h3>` + xps + `</section>`): '') + 
    `</main>
    <footer>
      <p>Created by: Atta Work  / 2022 </p>
    </footer>
  </body>
  </html>`
}

export {setUser, getUser, getCurriculoPDF}