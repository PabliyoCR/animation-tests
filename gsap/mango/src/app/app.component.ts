import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import Draggable from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import * as d3 from 'd3';
import { drag } from 'd3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'mango';

  tt = gsap.timeline()

  constructor() {
    gsap.registerPlugin(Physics2DPlugin);
    gsap.registerPlugin(Draggable);
    gsap.registerPlugin(InertiaPlugin);
  }

  /* ngOnInit() {
    this.demo()
  }

  demo() {
    var engine = Engine.create()
    var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: 800,
        height: 400,
        wireframes: false,
      },
    })
    var boxA = Matter.Svg.pathToVertices
    var ballA = Bodies.circle(380, 100, 40, {})
    var ballB = Bodies.circle(460, 10, 40, {})
    var ground = Bodies.rectangle(400, 380, 810, 60, {
      isStatic: true,
    })
    World.add(engine.world, [boxA, ballA, ballB, ground])
    Engine.run(engine)
    Render.run(render)

    console.log(boxA);
  } */

  ngAfterContentInit() {
    this.createInteractiveSVG()
  }

  createInteractiveSVG() {
    const data = {
      nodes: [
        {
          id: "O",
          d: "M550,315c-60.1-0.9-109.7,47.7-110.6,108.7c-1,61,47,111.2,107.2,112.1c60.1,0.9,109.7-47.7,110.6-108.7C658.1,366.1,610.2,315.9,550,315z M547.6,486.7c-33.2-0.5-59.7-28.4-59.2-62.3c0.5-33.9,27.9-60.9,61.1-60.4c33.2,0.5,59.7,28.4,59.2,62.3C608.1,460.2,580.8,487.2,547.6,486.7z",
          color: "#FFC0ED"
        },
        {
          id: "G",
          d: `M412.8,257l-4.6,13.4l-0.6,1.7c-12.5-16.3-29.7-29.3-50.5-36.5c-56.9-19.6-119.1,11.2-139,68.9
        c-19.9,57.7,10.1,120.3,66.9,139.9c20.8,7.2,42.3,7.6,62.2,2.4l-5.9,17c-5.3,15.4-14.9,27.1-28.4,34.8c-13.6,7.7-27.6,9.2-41.5,4.4
        c-9.5-3.3-17.5-9.1-23.7-17.4c-6.1-8.1-9.7-17.5-10.7-28l-49.1,4.9c2.1,20,9,37.7,20.5,52.5c12.1,16.5,27.9,28.1,47,34.7
        c12.7,4.4,26.5,6,41.2,4.9c14.1-1.6,27.1-5.6,38.7-12c25.5-13.9,43.2-35,52.8-62.7l36-104.4l0,0c0,0,0,0,0,0l35.3-102.5L412.8,257z
        M301.3,398.1c-31.4-10.8-47.9-45.6-36.8-77.6c11-32,45.5-49.2,76.8-38.4c31.4,10.8,47.9,45.6,36.8,77.6
        C367.1,391.7,332.7,408.9,301.3,398.1z`,
          color: "#FCC711"
        },
        {
          id: "N",
          d: `M737.2,192.2c10.6,8,16.9,18.7,18.7,31.8c1.8,13.1-1.2,24.9-8.9,35.2L673.7,356l39.7,30l73.2-96.8
        c16-21.1,22.1-45.3,18.2-71.8c-3.9-26.6-16.6-48.2-38-64.4c-21.4-16.1-45.6-22.5-72.1-18.9l0,0c-26.5,3.6-48,16.2-63.9,37.3
        l-73.2,96.8l39.7,30l73.2-96.8c7.7-10.2,18.3-16.3,31.4-18.2C714.9,181.4,726.8,184.4,737.2,192.2z`,
          color: "#34C6F4"
        },
        {
          id: "M",
          d: `M150.2,92.2c7.1-7.2,15.8-10.9,26.1-11.1c10.3-0.1,19.1,3.4,26.4,10.5l94.3,92.2l34.5-35.3l-94.3-92.2
          c-16.8-16.4-37.4-24.7-61.2-24.5c-23.8,0.2-44.3,8.9-61,25.9c-16.8,17.2-25,38-24.3,61.7l0,0.9l-0.9,0
          c-23.7-0.2-44.3,8.5-61.1,25.7c-16.6,17-24.9,37.7-24.5,61.5c0.4,23.8,9.1,44.2,25.9,60.7l94.3,92.2l34.5-35.3L64.5,233
          c-7.2-7.1-10.9-15.8-11.1-26.1c-0.1-10.3,3.4-19.1,10.5-26.4c7.1-7.2,15.8-10.9,26.1-11.1c10.3-0.1,19.1,3.4,26.4,10.5l94.3,92.2
          l34.5-35.3l-94.3-92.2c-7.2-7.1-10.9-15.8-11.1-26.1C139.6,108.3,143.1,99.4,150.2,92.2z`,
          color: "#85E4EB"
        },
        {
          id: "A",
          d: `M569.1,144.5C569.1,144.5,569.1,144.5,569.1,144.5C580.4,84.8,541.8,27.3,482.8,16
          c-59.1-11.3-116.2,28.1-127.7,88C343.7,164,382.3,221.7,441.4,233c21.5,4.1,42.8,1.5,61.6-6.4l-2.8,14.8l48.7,9.3l20.2-105.7
          C569.1,144.8,569.1,144.7,569.1,144.5z M403.3,113.3c6.4-33.3,38-55.2,70.6-49c32.6,6.2,53.9,38.3,47.6,71.5
          c-6.4,33.3-38,55.2-70.6,49C418.2,178.6,396.9,146.5,403.3,113.3z`,
          color: "#FF5133"
        }
      ],
      links: [
        { source: "M", target: "A", value: 0 },
        { source: "A", target: "N", value: 0 },
        { source: "N", target: "G", value: 0 },
        { source: "G", target: "O", value: 0 },
        { source: "G", target: "M", value: 0 },
      ]
    };

    const width = window.innerWidth;
    const height = window.innerHeight;

    const drag = (simulation: any) => {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(1).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
        var theta = Math.atan2(event.y - 500 / 2, event.x - 500 / 2) * 180 / Math.PI
        node.attr('transform', `rotate(${theta + 90}, ${event.x}, ${event.y})`)
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };

    const links = data.links.map((d) => Object.create(d));
    const nodes = data.nodes.map((d) => Object.create(d));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d: any) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(0, 0))
      .force('collision', d3.forceCollide().radius(function (d) {
        return 20
      }));

    const svg = d3.select("#svg__content")

    const node = svg
      .attr("viewBox", "0 0 810 569")
      .append("g")
      .selectAll("path")
      .data(nodes)
      .join("path")
      .attr("d", (d: any) => d.d)
      .attr("fill", (d: any) => d.color)
      .attr("class", 'letter')
      .attr("id", (d: any) => d.id)
      .call(drag(simulation) as any);

    var _this = this
    this.tt.fromTo('.letter', { y: '-100%' }, {
      duration: 0.5, physics2D: { gravity: 600 }, stagger: {
        each: 0.1, onComplete: function () {
          _this.bounceEffect(this)

        }
      }
    })
      .then(() => {
        setTimeout(() => {
          this.tt
            .add('start')
            .to('#M', { x: -16.860141855917504, y: 29.33606091872757, duration: 0.5 }, 'start')
            .to('#A', { x: -47.11770136633737, y: -2.6395180140940275, duration: 0.5 }, 'start')
            .to('#N', { x: -12.62008997863065, y: -29.7673095263643, duration: 0.5 }, 'start')
            .to('#G', { x: 18.316815065400778, y: 2.424141399443573, duration: 0.5 }, 'start')
            .to('#O', { x: 58.27732980703911, y: 0.6472729602765456, duration: 0.5 }, 'start')
            .then(() => {
              simulation.on("tick", () => {
                node.attr("transform", (d: any) => {
                  return "translate(" + d.x + "," + d.y + ")";
                })
              });
            })
        }, 100);
      })

  }

  bounceEffect(element: any) {
    gsap.to(element.targets()[0], { ease: "elastic.out(1, 0.3)", y: 0 })
  }

}

