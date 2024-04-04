//array
let participantes = [
  {
    nome: "Laís Hillary",
    email: "laishillary20@gmail.com",
    datainscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 20, 0)
  },
  {
    nome: "Mayk Brito",
    email: "maykk@gmail.com",
    datainscricao: new Date(2024, 1, 20, 17, 20),
    dataCheckIn: null
  },
  {
    nome: "João Silva",
    email: "joaosilva@gmail.com",
    datainscricao: new Date(2024, 0, 15, 10, 30),
    dataCheckIn: new Date(2024, 2, 18, 9, 45)
  },
  {
    nome: "Maria Oliveira",
    email: "mariaoliveira@gmail.com",
    datainscricao: new Date(2024, 1, 5, 14, 10),
    dataCheckIn: null
  },
  {
    nome: "Carlos Santos",
    email: "carlossantos@gmail.com",
    datainscricao: new Date(2024, 1, 10, 16, 45),
    dataCheckIn: new Date(2024, 3, 6, 10, 15)
  },
  {
    nome: "Ana Lima",
    email: "analima@gmail.com",
    datainscricao: new Date(2024, 2, 3, 11, 0),
    dataCheckIn: new Date(2024, 3, 5, 13, 30)
  },
  {
    nome: "Pedro Costa",
    email: "pedrocosta@gmail.com",
    datainscricao: new Date(2024, 0, 25, 8, 15),
    dataCheckIn: new Date(2024, 2, 10, 18, 0)
  },
  {
    nome: "Sandra Martins",
    email: "sandramartins@gmail.com",
    datainscricao: new Date(2024, 0, 30, 13, 20),
    dataCheckIn: new Date(2024, 2, 15, 14, 45)
  },
  {
    nome: "Paulo Pereira",
    email: "paulopereira@gmail.com",
    datainscricao: new Date(2024, 1, 8, 9, 50),
    dataCheckIn: new Date(2024, 2, 20, 11, 10)
  },
  {
    nome: "Camila Fernandes",
    email: "camilafernandes@gmail.com",
    datainscricao: new Date(2024, 2, 10, 15, 30),
    dataCheckIn: new Date(2024, 3, 1, 16, 20)
  },
  {
    nome: "Mariana Santos",
    email: "marianasantos@gmail.com",
    datainscricao: new Date(2024, 0, 10, 12, 30),
    dataCheckIn: new Date(2024, 2, 12, 14, 15)
  },
  {
    nome: "Gabriel Oliveira",
    email: "gabrieloliveira@gmail.com",
    datainscricao: new Date(2024, 1, 18, 11, 0),
    dataCheckIn:null
  },
  {
    nome: "Aline Costa",
    email: "alinecosta@gmail.com",
    datainscricao: new Date(2024, 0, 5, 9, 45),
    dataCheckIn: new Date(2024, 2, 8, 17, 20)
  },
  {
    nome: "Felipe Lima",
    email: "felipelima@gmail.com",
    datainscricao: new Date(2024, 1, 28, 14, 20),
    dataCheckIn: new Date(2024, 3, 7, 11, 45)
  },
  {
    nome: "Isabela Silva",
    email: "isabelasilva@gmail.com",
    datainscricao: new Date(2024, 0, 20, 10, 15),
    dataCheckIn: new Date(2024, 2, 25, 16, 0)
  }
];

const criarNovoParticipante = (participante) => {
  const datainscricao = dayjs(Date.now())
  .to(participante.datainscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
    dataCheckIn = `
    <button
    data-email = "${participante.email}"
    onclick= fazerCheckIn(event)> 
    Confirmar Check - in 
    </button>
    `  
    }
  return ` 
    <tr>
      <td>
        <strong>
        ${participante.nome}
        </strong>
        <br>
        <small>
        ${participante.email}
        </small>
        </td>
      <td> 
      ${datainscricao}
      </td>
      <td> 
      ${dataCheckIn}
      </td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes){
    output += criarNovoParticipante(participante)

  }
  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'), 
    datainscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find((p)=> p.email == participante.email
  )

  if(participanteExiste){
    alert("Email já cadastrado")
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""

  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

  const confimacao = "Tem certeza que deseja fazer o Check-in?"
  if(confirm(confimacao)==false){
    return
  }
  const participante = participantes.find((p)=> p.email == event.target.dataset.email
  )

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}