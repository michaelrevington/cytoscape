import "./styles.css";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import "cytoscape-context-menus/cytoscape-context-menus.css";

var nodeHtmlLabel = require("cytoscape-node-html-label");
var expandCollapse = require("cytoscape-expand-collapse");
var contextMenus = require("cytoscape-context-menus");

cytoscape.use(dagre);

if (typeof cytoscape("core", "expandCollapse") === "undefined") {
  expandCollapse(cytoscape);
}
if (typeof cytoscape("core", "nodeHtmlLabel") === "undefined") {
  nodeHtmlLabel(cytoscape);
}
if (typeof cytoscape("core", "contextMenus") === "undefined") {
  contextMenus(cytoscape);
}

var options = {
  evtType: "cxttap",
  menuItems: [
    {
      id: "details",
      content: "View Details...",
      tooltipText: "View Details",
      selector: "node, edge",
      onClickFunction: function (event) {},
      hasTrailingDivider: true
    },
    {
      id: "generateReport",
      content: "Generate Report",
      selector: "node, edge",
      onClickFunction: function (event) {},
      hasTrailingDivider: true
    }
  ],
  menuItemClasses: ["custom-menu-item", "custom-menu-item:hover"],
  contextMenuClasses: ["custom-context-menu"]
};

var cy = cytoscape({
  container: document.getElementById("cy"),

  ready: function () {
    var instance = this.contextMenus(options);

    var api = this.expandCollapse({
      layoutBy: {
        name: "dagre",
        animate: "end",
        randomize: false,
        fit: false
      },
      fisheye: false,
      animate: true,
      undoable: false,
      cueEnabled: true,
      expandCollapseCuePosition: "top-left",
      expandCollapseCueSize: 16,
      expandCollapseCueLineSize: 26,
      expandCueImage: "./imgs/ic_expand_more.svg",
      collapseCueImage: "./imgs/ic_expand_less.svg",
      expandCollapseCueSensitivity: 1,
      edgeTypeInfo: "edgeType",
      groupEdgesOfSameTypeOnCollapse: false,
      allowNestedEdgeCollapse: false,
      zIndex: 999
    });

    document
      .getElementById("collapseAll")
      .addEventListener("click", function () {
        api.collapseAll();
      });

    document.getElementById("expandAll").addEventListener("click", function () {
      api.expandAll();
    });
  },

  style: [
    //CORE
    {
      selector: "core",
      css: {
        "active-bg-size": 0 //The size of the active background indicator.
      }
    },

    //NODE
    {
      selector: "node",
      css: {
        width: "38px",
        height: "38px",
        "font-family": "Nokia Pure Regular",
        "background-opacity": "0"
      }
    },
    //GROUP
    {
      selector: "node.cy-expand-collapse-collapsed-node",
      css: {
        width: "56px",
        height: "56px",
        "background-opacity": "0",
        "font-family": "Nokia Pure Regular"
      }
    },
    {
      selector: "$node > node",
      css: {
        "background-color": "#fff",
        "background-opacity": "1",
        "border-width": "1px",
        "border-color": "#dcdcdc",

        //LABEL
        //label: "data(name)",
        color: "#000",
        shape: "rectangle",
        "text-opacity": "0.56",
        "font-size": "10px",
        "text-transform": "uppercase",
        "text-wrap": "none",
        "text-max-width": "75px",
        "text-overflow-wrap": "ellipsis",
        "padding-top": "16px",
        "padding-left": "16px",
        "padding-bottom": "16px",
        "padding-right": "16px"
      }
    },
    {
      selector: ":parent",
      css: {
        "text-valign": "top",
        "text-halign": "center"
      }
    },
    //EDGE
    {
      selector: "edge",
      style: {
        width: 1,
        "line-color": "#b8b8b8",
        "curve-style": "bezier",

        //LABEL
        label: ""
      }
    },
    {
      selector: "edge.hover",
      style: {
        width: 2,
        "line-color": "#239df9"
      }
    },
    {
      selector: "edge:selected",
      style: {
        width: 1,
        "line-color": "#239df9"
      }
    }
  ],

  layout: {
    name: "dagre",
    padding: 24
  },

  elements: [
    {
      group: "nodes",
      data: {
        id: "n0",
        name: "service name very long",
        type: "service",
        operationalState: "working",
        alarmSeverity: "cleared"
      },
      classes: "nodeIcon"
    },
    {
      group: "nodes",
      data: {
        id: "group1",
        name: "group1"
      },
      classes: "groupIcon"
    },
    {
      group: "nodes",
      data: {
        id: "n1.1",
        name: "n1.1",
        type: "equipment_ne",
        parent: "group1",
        operationalState: "working",
        alarmSeverity: "cleared"
      },
      classes: "nodeIcon"
    },
    {
      group: "nodes",
      data: {
        id: "n1.2",
        name: "n1.2",
        type: "server",
        parent: "group1",
        operationalState: "working",
        alarmSeverity: "warning"
      },
      classes: "nodeIcon"
    },
    {
      group: "nodes",
      data: {
        id: "n1.3",
        name: "n1.3",
        type: "equipment_ne",
        parent: "group1",
        operationalState: "notWorking",
        alarmSeverity: "cleared"
      },
      classes: "nodeIcon"
    },
    {
      group: "nodes",
      data: {
        id: "group2",
        name: "group2"
      },
      classes: "groupIcon"
    },
    {
      group: "nodes",
      data: {
        id: "n2.1",
        name: "n2.1",
        type: "vnf",
        parent: "group2",
        operationalState: "working",
        alarmSeverity: "cleared"
      },
      classes: "nodeIcon"
    },
    {
      group: "nodes",
      data: {
        id: "n2.2",
        name: "n2.2",
        type: "equipment_ne",
        parent: "group2",
        operationalState: "working",
        alarmSeverity: "cleared"
      },
      classes: "nodeIcon"
    },
    {
      group: "nodes",
      data: {
        id: "n2.3",
        name: "n2.3",
        type: "vnf",
        parent: "group2",
        operationalState: "working",
        alarmSeverity: "critical"
      },
      classes: "nodeIcon"
    },
    {
      group: "nodes",
      data: {
        id: "n2.4",
        name: "n2.4",
        type: "equipment_ne",
        parent: "group2",
        operationalState: "working",
        alarmSeverity: "minor"
      },
      classes: "nodeIcon"
    },
    {
      group: "nodes",
      data: {
        id: "n2.5",
        name: "n2.5",
        type: "server",
        parent: "group2",
        operationalState: "working",
        alarmSeverity: "major"
      },
      classes: "nodeIcon"
    },
    {
      group: "nodes",
      data: {
        id: "n2.6",
        name: "n2.6",
        type: "server",
        parent: "group2",
        operationalState: "working",
        alarmSeverity: "cleared"
      },
      classes: "nodeIcon"
    },
    {
      group: "nodes",
      data: {
        id: "group3",
        name: "group3"
      },
      classes: "groupIcon"
    },
    {
      group: "nodes",
      data: {
        id: "n3.1",
        name: "n3.1",
        type: "server",
        parent: "group3",
        operationalState: "working",
        alarmSeverity: "cleared"
      },
      classes: "nodeIcon"
    },
    {
      group: "nodes",
      data: {
        id: "n3.2",
        name: "n3.2",
        type: "equipment_ne",
        parent: "group3",
        operationalState: "working",
        alarmSeverity: "cleared"
      },
      classes: "nodeIcon"
    },

    { data: { group: "edges", source: "n0", target: "n1.1" } },
    { data: { group: "edges", source: "n0", target: "n1.3" } },
    { data: { group: "edges", source: "n1.1", target: "n1.2" } },
    { data: { group: "edges", source: "n0", target: "n3.2" } },
    { data: { group: "edges", source: "n3.2", target: "n3.1" } },
    { data: { group: "edges", source: "n0", target: "n2.2" } },
    { data: { group: "edges", source: "n0", target: "n2.4" } },
    { data: { group: "edges", source: "n2.4", target: "n2.6" } },
    { data: { group: "edges", source: "n2.5", target: "n2.1" } },
    { data: { group: "edges", source: "n2.4", target: "n2.5" } },
    { data: { group: "edges", source: "n2.5", target: "n2.3" } },
    { data: { group: "edges", source: "n3.2", target: "group3" } }
  ],

  zoomingEnabled: true,
  userZoomingEnabled: true,
  autoungrabify: false
});

cy.fit();
//NODE EVENTS
cy.on("mouseover", "node", function (e) {
  e.target.addClass("hover");
});
cy.on("mouseout", "node", function (e) {
  e.target.removeClass("hover");
});

cy.on("mousedown", "node", function (e) {
  e.target.addClass("hover");
});
cy.on("click", "node", function (e) {
  console.log("clicked:" + this.id());
});

//EDGES EVENTS
cy.on("mouseover", "edge", function (e) {
  e.target.addClass("hover");
});
cy.on("mouseout", "edge", function (e) {
  e.target.removeClass("hover");
});

cy.nodeHtmlLabel([
  {
    query: ".groupIcon",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
                <span class="group-graphic alarmSeverity-${data.status}">
                  <i class="icon icon-group"></i>
                  <span class="overlay"></span>
                </span>
                <span class="group-label">${data.name}</span>
              </div>`;
    }
  },
  {
    query: ".groupIcon.hover",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
                <span class="group-graphic hover alarmSeverity-${
                  data.alarmSeverity
                }">
                  <i class="icon icon-group"></i>
                  <span class="overlay"></span>
                </span>
                <span class="group-label">${data.name}</span>
              </div>`;
    }
  },
  {
    query: ".groupIcon:selected",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
                <span class="group-graphic selected alarmSeverity-${
                  data.alarmSeverity
                }">
                  <i class="icon icon-group"></i>
                  <span class="overlay"></span>
                </span>
                <span class="group-label">${data.name}</span>
              </div>`;
    }
  },
  {
    query: ".groupIcon.hover:selected",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
                <span class="group-graphic hover selected alarmSeverity-${
                  data.alarmSeverity
                }">
                  <i class="icon icon-group"></i>
                  <span class="overlay"></span>
                </span>
                <span class="group-label">${data.name}</span>
              </div>`;
    }
  },
  {
    query: ".nodeIcon",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="element ${data._hidden}">
                <span class="element-badge">
                  <i class="icon icon-${data.alarmSeverity}" /></i>
                </span>
                <span class="element-graphic operationalState-${data.operationalState}">
                  <i class="icon icon-${data.type}" /></i>
                  <span class="overlay"></span>
                </span>
                <span class="element-label">${data.name}</span>
              </div>`;
    }
  },
  {
    query: ".nodeIcon.hover",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="element ${data._hidden}">
                <span class="element-badge">
                  <i class="icon icon-${data.alarmSeverity}" /></i>
                </span>
                <span class="element-graphic hover operationalState-${data.operationalState}">
                  <i class="icon icon-${data.type} icon-hover" /></i>
                  <span class="overlay_grey"></span>
                </span>
                <span class="element-label">${data.name}</span>
              </div>`;
    }
  },
  {
    query: ".nodeIcon:selected",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="element ${data._hidden}">
                <span class="element-badge">
                  <i class="icon icon-${data.alarmSeverity}" /></i>
                </span>
                <span class="element-graphic selected operationalState-${data.operationalState}">
                  <i class="icon icon-${data.type}" /></i>
                  <span class="overlay_grey"></span>  
                  <span class="overlay_red"></span>
                </span>
                <span class="element-label">${data.name}</span>
              </div>`;
    }
  },
  {
    query: ".nodeIcon.hover:selected",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="element ${data._hidden}">
                <span class="element-badge">
                  <i class="icon icon-${data.alarmSeverity}" /></i>
                </span>
                <span class="element-graphic hover selected operationalState-${data.operationalState}">
                  <i class="icon icon-${data.type}" /></i>
                  <span class="overlay_grey"></span>
                  <span class="overlay_red"></span>
                </span>
                <span class="element-label">${data.name}</span>
              </div>`;
    }
  }
]);

cy.nodes().on("expandcollapse.beforecollapse", function (e) {
  console.log("Triggered before a node is collapsed");
});

cy.nodes().on("expandcollapse.aftercollapse", function (e) {
  console.log("Triggered after a node is collapsed");
});

cy.nodes().on("expandcollapse.beforeexpand", function (e) {
  console.log("Triggered before a node is expanded");
});

cy.nodes().on("expandcollapse.afterexpand", function (e) {
  console.log("Triggered after a node is expanded");
});

cy.edges().on("expandcollapse.beforecollapseedge", function (e) {
  console.log("Triggered before an edge is collapsed");
});

cy.edges().on("expandcollapse.aftercollapseedge", function (e) {
  console.log("Triggered after an edge is collapsed");
});

cy.edges().on("expandcollapse.beforeexpandedge", function (e) {
  console.log("Triggered before an edge is expanded");
});

cy.edges().on("expandcollapse.afterexpandedge", function (e) {
  console.log("Triggered after an edge is expanded");
});

cy.nodes().on("expandcollapse.beforecollapse", function (event) {
  var node = this;
  event.cy
    .nodes()
    .filter((entry) => entry.data().parent === node.id())
    .map((entry) => entry.data("_hidden", "node-hidden"));
  node.data("_hidden", "");
});

cy.nodes().on("expandcollapse.afterexpand", function (event) {
  var node = this;
  event.cy
    .nodes()
    .filter((entry) => entry.data().parent === node.id())
    .map((entry) => entry.data("_hidden", ""));
  node.data("_hidden", "node-hidden");
});
