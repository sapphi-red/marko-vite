import { t, v as vElement, r, a as renderer, d as defineComponent, b as renderTag } from "./vendor.ded2c551.js";
var index_marko = "\n  div { color: green }\n";
const _marko_componentType$2 = "h5bDTuBb", _marko_template$2 = t(_marko_componentType$2);
const _marko_node = vElement("div", {
  "id": "class"
}, "0", null, 0, 1);
r(_marko_componentType$2, () => _marko_template$2);
const _marko_component$2 = {
  onMount() {
    console.log("mounted");
  }
};
_marko_template$2._ = renderer(function(input, out, _componentDef, _component, state) {
  out.n(_marko_node, _component);
}, {
  t: _marko_componentType$2
}, _marko_component$2);
_marko_template$2.Component = defineComponent(_marko_component$2, _marko_template$2._);
const _marko_componentType$1 = "RgYWz5U1", _marko_template$1 = t(_marko_componentType$1);
r(_marko_componentType$1, () => _marko_template$1);
const _marko_component$1 = {};
_marko_template$1._ = renderer(function(input, out, _componentDef, _component, state) {
  out.be("div", {
    "id": "implicit"
  }, "0", _component, null, 1);
  renderTag(_marko_template$2, {}, out, _componentDef, "1");
  out.ee();
}, {
  t: _marko_componentType$1,
  i: true
}, _marko_component$1);
_marko_template$1.Component = defineComponent(_marko_component$1, _marko_template$1._);
const _marko_componentType = "py6VJAXd", _marko_template = t(_marko_componentType);
r(_marko_componentType, () => _marko_template);
const _marko_component = {};
_marko_template._ = renderer(function(input, out, _componentDef, _component, state) {
  out.be("div", {
    "id": "page"
  }, "0", _component, null, 1);
  renderTag(_marko_template$1, {}, out, _componentDef, "1");
  out.ee();
}, {
  t: _marko_componentType,
  i: true
}, _marko_component);
_marko_template.Component = defineComponent(_marko_component, _marko_template._);