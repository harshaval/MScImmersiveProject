window.onload = () => {
    let downloaded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", async(e) => {
        if(!downloaded) {
            const west = e.detail.position.longitude - 0.05,
                  east = e.detail.position.longitude + 0.05,
                  south = e.detail.position.latitude - 0.05;
                  north = e.detail.position.latitude + 0.05;
            console.log(`${west} ${south} ${east} ${north}`);
            const response = await fetch(`https://hikar.org/webapp/map?bcircle=${west},${south},${east},${north}&layers=poi&outProj=4326`);
            const pois = await response.json();
            pois.features.forEach ( feature => {
                const compoundEntity = document.createElement("a-entity");
                compoundEntity.setAttribute('gps-new-entity-place', {
                    latitude: feature.geometry.coordinates[1],
                    longitude: feature.geometry.coordinates[0]
                });
                const circle = document.createElement("a-circle");
                circle.setAttribute("scale", {
                    x: 20,
                    y: 20,
                    z: 20
                });
                circle.setAttribute('material', { color: 'red' } );
                circle.setAttribute("position", {
                    x : 0,
                    y : 20,
                    z: 0
                } );
                const text = document.createElement("a-text");
                const textScale = 100;
                text.setAttribute("look-at", "[gps-new-camera]");
                text.setAttribute("scale", {
                    x: textScale,
                    y: textScale,
                    z: textScale
                });
                text.setAttribute("value", feature.properties.name);
                text.setAttribute("align", "center");
                compoundEntity.appendChild(circle);
                compoundEntity.appendChild(text);
                document.querySelector("a-scene").appendChild(compoundEntity);
            });
        }
        downloaded = true;
    });
};