function cargarGrafico(datos = [], name) {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: `Estadísticas de poder para ${name}`
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: datos
        }]
    });
    chart.render();
};

function obtenerData(id) {
    let url = "https://www.superheroapi.com/api.php/4905856019427443/" + id;

    $.ajax(url)
        .done(function (datos) {
            let { powerstats } = datos;
            let dataPoints = [];
            for (const [key, value] of Object.entries(powerstats)) {
                //{label: "texto", y: 50}
                let dato = {
                    label: key,
                    y: value
                }

                dataPoints.push(dato);
            }
            cargarGrafico(dataPoints, datos.name);
            cargarCard(datos);
        })
        .fail(function () {
            alert("error");
        })

}
$("form").on("submit", function (event) {
    /* if ($("input").first().val() === "correct") {
        $("span").text("Validated...").show();
        return;
    }

    $("span").text("Not valid!").show().fadeOut(1000); */
    event.preventDefault();
    const id = $("#formSuperhero").val()
    obtenerData(id);

});

function cargarCard(superhero) {
    $("#cardContainer").html(
        `<div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${superhero.image.url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${superhero.name}</h5>
              <h6 class="card-subtitle">${superhero.biography["full-name"]}</h6>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>`
    )
}



