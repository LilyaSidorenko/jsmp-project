const range = n => (n ? [...range(n-1), n-1] : []);

const f2s = n => n.toFixed(2).toString();

const replaceContentWithText = (domEl, txt) => {
    while (domEl.lastChild)
        domEl.removeChild(domEl.lastChild);
    domEl.appendChild(document.createTextNode(txt));
}

//const randSeq = range(100).map(n => Math.random());
const randSeq = [0.52,0.15,0.6,0.35,0.16,0.84,0.85,0.05,0.3,0.11,0.96,0.86,0.93,0.98,0.84,0.9,0.22,0.9,0.3,0,0.31,0.89,0.05,0,0.81,0.63,0.08,0.51,0.72,0.41,0.48,0.59,0.16,0.86,0.84,0.34,0.06,0.8,0.24,0.07,0.52,0.79,0.53,0.47,0.67,0.17,0.54,0.02,0.7,0.43,0.19,0.91,0.19,0.29,0.55,0.4,0.35,0.69,0.99,0.79,0.87,0.27,0.84,0.71,0.58,0.9,0.67,0.76,0.91,0.13,0.01,0.82,0.94,0.52,0.26,0.11,0.03,0.55,0.49,0.96,0.3,0.12,0.72,0.27,0.28,0.5,0.23,0.4,0.29,0.47,0.78,0.28,0.65,0.12,0.14,0.32,0.57,0.78,0.66,0.03];

////////////////////////////////

const renderBubble = ({ x, y, h, size, scale, t }) => (
    `<g transform="translate(${x}, ${y})">
    <circle cx="0" cy="0" r="${size * scale}">    
      <animateTransform attributeName="transform"
        type="translate"
        from="0 0" to="0 ${f2s(-h*1.5 + 30)}"
        begin="${t}s"
        dur="${f2s(0.5 + 1/((scale*0.6+0.4)*(scale*0.6+0.4)))}s"
        repeatCount="indefinite"
        additive="sum" />
    
      <animateTransform attributeName="transform"
        type="translate"
        id="bubbleright"
        values="-5;5;-5"
        begin="${t}s"
        dur="0.75s"
        repeatCount="indefinite"
        animationDirection="alternate"
        additive="sum" />
    
      <animateTransform attributeName="transform"
        type="scale"
        values="0;0.75;0.9;1;1;1;0.3;0"
        begin="${t}s"
        dur="${f2s(0.5 + 1/((scale*0.6+0.4)*(scale*0.6+0.4)))}s"
        repeatCount="indefinite"
        animationDirection="alternate"
        additive="sum" />
    </circle>
  </g>`
);

const renderTube = ({ id, w, h, b, bb, lvl, ib, s, colTub, colBub1, colBub2, colLiq }) => (
    `<g>
    <defs>
      <clipPath id="${id}-stay-inside">
        <path
          d="M ${w-ib} -200
             V ${h}
             c 0          ${w*0.75 - ib*1.4},
               ${-w+ib*2} ${w*0.75 - ib*1.4},
               ${-w+ib*2} 0
             V -200"
       />
      </clipPath>
      <linearGradient
        id="liquid_1_" gradientUnits="userSpaceOnUse"
        x1="35.0005" y1="231.5" x2="35.0005" y2="24.8977"
        >
        <stop  offset="0" style="stop-color: #A8FC9A" />
        <stop  offset="1" style="stop-color: #FFDF7F" />
      </linearGradient>
      <filter id="${id}-bub-filter" filterUnits="objectBoundingBox">
        <feColorMatrix in="SourceGraphic" x="0" y="-200"
          width="${w}"
          height="${f2s((h + (w-b*1.4)*0.55) * (1-lvl) + 200)}"
          flood-color="#EA312F" result="m1"
          type="matrix"
          values="0 0 0 0 ${colBub2[0]}
                   0 0 0 0 ${colBub2[1]}
                   0 0 0 0 ${colBub2[2]}
                   0 0 0 1 0" />
        <feColorMatrix in="SourceGraphic" x="0"
          y="${f2s((h + (w-b*1.4)*0.55) * (1-lvl))}"
          width="${w}"
          height="${h+w}"
          flood-color="#EA312F" result="m2"
          type="matrix"
          values="0 0 0 0 ${colBub1[0]}
                   0 0 0 0 ${colBub1[1]}
                   0 0 0 0 ${colBub1[2]}
                   0 0 0 1 0" />
        <feBlend in="m2" in2="m1" mode="add"/>
      </filter>
    </defs>
    
    <rect
      id="liquid"
      x="0"
      width="${w}"
      y="${f2s((h + (w-b*1.4)*0.55) * (1-lvl))}"
      height="${f2s((h + (w-b*1.4)*0.55) * lvl)}"
      clip-path="url(#${id}-stay-inside)"
      fill="${colLiq || 'url(#liquid_1_)'}"
    />
    
    <g fill="white" clipPath="url(#stay-inside)" filter="url(#${id}-bub-filter)">
      ${range(((lvl * 10) << 0) * 3).map((n, i, arr) => (
        renderBubble({
            x: f2s(ib + n*(w-ib*2)/arr.length),
            y: h + w*0.5,
            h: f2s(h*lvl + w*0.5 + 45),
            size: s,
            scale: f2s(0.4 + (0.5 + randSeq[i]*0.5 * 1) * randSeq[i]),
            t: randSeq[i + 50]*2,
        })
    )).join('')}
    </g>
    
    <path fill=${colTub}
      d="M ${-bb} 0
        V ${b}
        L 0 ${b}

        v ${h - b}
        c 0         ${w*0.75},
          ${w}      ${w*0.75},
          ${w}      0
        
        V ${b}
        h ${bb}
        V 0
        h ${-bb}

        h ${-b}
        v ${h - b + b}
        c 0         ${w*0.75 - b*1.4},
          ${-w+b*2} ${w*0.75 - b*1.4},
          ${-w+b*2} 0

        V 0" />
  </g>`
);

const renderSVG = tubeParams => (
    `<svg width="180" height="420" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(${(180 - tubeParams.w)*0.5}, ${(420 - tubeParams.h)*0.5})">
      ${renderTube(tubeParams)}
    </g>
  </svg>`
);

////////////////////////////////

const domRender = (tubeProps, domContainer, slidables=[]) => {
    domContainer.innerHTML = '';
    const svgDiv = document.createElement('div');
    domContainer.appendChild(svgDiv);

    // display slider
    let sliders = {};
    slidables.forEach(slidable => {
        const sliderDiv = document.createElement('div');
        const slider = document.createElement('input');
        slider.setAttribute('type', 'range');
        slider.setAttribute('min', slidable.a);
        slider.setAttribute('max', slidable.b);
        slider.setAttribute('step', '0.01');
        sliderDiv.appendChild(slider);
        domContainer.appendChild(sliderDiv);
        sliders[slidable.p] = slider;
    });

    // display data size
    const fileInfo = document.createElement('div');
    domContainer.appendChild(fileInfo);

    const render = (props) => {
        // render and compact
        const code = renderSVG(props).replace(/\s+/g, ' ');

        // display the SVG code
        //const codeCont = document.getElementById('code-container');
        //replaceContentWithText(codeCont, code);

        // display the actual SVG (thanks innerHTML)
        svgDiv.innerHTML = code;

        // display data size
        replaceContentWithText(fileInfo, (code.length / 1024).toFixed(2) + ' KB');
    }

    const update = (prop, val) => {
        Object.assign(tubeProps, {[prop]: parseFloat(val)});
        render(tubeProps);
    };

    // init slider value, and update on slider slide
    for (let prop in sliders) {
        const slider = sliders[prop];
        slider.value = tubeProps[prop];
        slider.addEventListener(
            'input',
            evt => update(prop, evt.currentTarget.value)
        );
    }

    // initial render
    render(tubeProps);
}

////////////////////////////////

(function() {
    // tube parameters
    var commonTubeProps = {
        w: 80,
        h: 200,
        b: 6,
        bb: 4,
        ib: 12,
        s: 6,
        lvl: 0.72,
        colTub: 'lightblue',
        colBub1: [1, 1, 1],
        colBub2: [255/255, 154/255, 63/255],
        colLiq: undefined,
        _slidable: [],
    };

    const tubes = document.getElementById('tubes');

    var tubeProps = [
        {
            id: 'a', _slidable: [{ p: 'lvl', a: 0, b: 1 }],
            lvl: 0.25, colTub: '#A4DEDD',
        },
        {
            id: 'b',  _slidable: [{ p: 's', a: 2, b: 12 }],
            lvl: 0.7, b: 12, bb: 6, h: 250, s: 8,
            colTub: 'black', colBub: [0, 0, 0],
        }, {
            id: 'c', _slidable: [{ p: 'w', a: 25, b: 100 }],
            lvl: 0.5, h: 300, w: 40, s: 3, b: 4, bb: 2, ib: 8,
            colTub: '#3DD182', colBub2: [61/255, 209/255, 130/255], colLiq: '#3DD182',
        }, {
            id: 'd',  _slidable: [{ p: 'h', a: 20, b: 300 }],
            lvl: 0.88, b: 16, ib: 22, h: 100, w: 100,
            colTub: 'black', colBub1: [1, 1, 1],
            colBub2: [0, 0, 0], colLiq: '#BC8ADE',
        },
    ];

    tubeProps.forEach(props => {
        const tube1 = document.createElement('div');
        tube1.setAttribute('class', 'tube');
        tubes.appendChild(tube1);
        domRender(Object.assign({}, commonTubeProps, props), tube1, props._slidable);
    });
})();

