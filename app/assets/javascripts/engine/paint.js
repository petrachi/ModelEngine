// var Paint = function(svg, type, options){
//   this.fill = 'transparent';
//   this.stroke = 'orange';
//
//   if(options){
//     if(options['fill']) this.fill = options['fill'];
//     if(options['stroke']) this.stroke = options['stroke'];
//   }
//
//   this.elt = document.createElementNS("http://www.w3.org/2000/svg", type);
//   this.elt.setAttribute('fill', this.fill);
//   this.elt.setAttribute('stroke', this.stroke);
//   this.elt.setAttribute('stroke-width', '0.005');
//
//   this.draw = function(){
//     this.elt.setAttribute('d', this.path());
//   }
//
//   this.init = function(){
//     this.polyhedron.svg.appendChild(this.elt);
//   }
//   this.init();
// }
