
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Home',
            location: {
                // decomment the following and add coordinates:
                lat: 53.221641,
                lng: -4.130223,
            },
        },
        {
            name: 'Barlows',
            location: {
                // decomment the following and add coordinates:
                lat: 53.222303686325006,
                lng: -4.129229144041981,
            },
        }
    ];
}

var models = [
    {
        url: './assets/map-pin.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Home marker',
        rotation: '0 180 0',
    },
    {
        url: './assets/pin.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Barlows marker',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}