	// const list = require("../../controllers/listing")
    // console.log(list.createListing);
    mapboxgl.accessToken = maptoken ; 
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

// console.log(coordinates);

    const marker1 = new mapboxgl.Marker({color : "red "})
        .setLngLat(coordinates)
        .setPopup(
            new mapboxgl.Popup({offset:25}).setHTML(
                `<h4>${exactlocation}</h4><p>The exact location of listing</p>`)
        .setMaxWidth("300px"))
        .addTo(map);
    
    // const popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
    //     .setLngLat(e.lngLat)
    //   .setHTML("<h1>Hello World!</h1>")
    //     .setMaxWidth("300px")
    //     .addTo(map);
