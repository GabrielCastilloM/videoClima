//Reto de video
const video = document.querySelector("#video")
const btnResproducir = document.querySelector("#reproducir")
const btnPausar = document.querySelector("#pausar")
const btnMute = document.querySelector("#mute")
const btnBig = document.querySelector("#big")

const reproducir =() =>{
    video.play()
}

const pausar = () => {
    video.pause()
}
const mutear = () => {
  if (video.muted == false) {
    video.muted = true
  } else {
    video.muted = false
  }

}
const hacerGrandeVideo = () => {
  video.style.width == '100%' ? video.style.width = '50%':video.style.width = '100%'
}

btnResproducir.addEventListener('click', reproducir)
btnPausar.addEventListener('click', pausar)
btnMute.addEventListener('click', mutear)
btnBig.addEventListener('click', hacerGrandeVideo  )

//Reto consumir api de clima openweathermap.org
  const obtenerDatos = (ciudad) => {
    const   KEY_API = 'dd130c00b823cfbdd95cc1d732944e50'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${KEY_API}`;
    const arrayDatos = fetch(url).then(res => res.json())
    document.getElementById("ciudad").value = "";
    arrayDatos.then((datos) => {
      pintarInformacion(datos)
    })
    .catch(() => {
      swal("Pais o Ciudad no encontrada", {
        icon: "error",
      });
    })
  }

  var btnconsulta = document.getElementById("generar");
  btnconsulta.addEventListener("click", () => {
  var inputCiudad = document.getElementById("ciudad");
  var valor = inputCiudad.value;
  if (valor == '') {
    swal("Por Favor Digitar Pais o Ciudad", {
      icon: "info",
    });
    } else {
      obtenerDatos(valor)
    }
  })

  document.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      var inputCiudad = document.getElementById("ciudad");
      var valor = inputCiudad.value;
      obtenerDatos(valor)
    }
  })

const pintarInformacion = (datos) => {
  const papa = document.querySelector('.contenedor__seccion2--consulta')
  papa.insertAdjacentHTML('beforeend', userTemplate(datos));

}
  //funcion crea el template de la tarjeta
  function userTemplate(datos) {
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
      datos.weather[0]["icon"]
    }.svg`;

    const temperatura = datos.main.temp
    const temperaturaConvertidaString = temperatura.toString()
    const temperatoraAGrados = temperaturaConvertidaString.substring(0, temperaturaConvertidaString.length - 4)

    return `
    <div class="card mb-2 shadow">
          <div class="card-body">
          <h5 class="card-title">${datos.name}
          <sup>${datos.sys.country}</sup>
          </h5>
            <p >Temperatura ${(temperatoraAGrados)}° </p>
            <img class="city-icon" src="${icon}">
            <p class="card-text" id="card">${datos.weather[0]["description"]}</p>
            <p class="card-text" id="card"></p>
          </div>
        </div>
    `;
  }
