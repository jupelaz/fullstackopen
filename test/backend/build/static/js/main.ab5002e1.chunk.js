(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{39:function(t,e,n){},40:function(t,e,n){"use strict";n.r(e);var c=n(2),o=n.n(c),r=n(15),i=n.n(r),a=n(6),u=n(3),s=n(0),l=function(t){var e=t.note,n=t.toggleImportance,c=e.important?"make not important":"make important";return Object(s.jsxs)("li",{className:"note",children:[e.content,Object(s.jsx)("button",{onClick:n,children:c})]})},j=function(t){var e=t.message;return null===e?null:Object(s.jsx)("div",{className:"error",children:e})},f=n(4),b=n.n(f),d="/api/notes",m={getAll:function(){return b.a.get(d).then((function(t){return t.data}))},create:function(t){return b.a.post(d,t).then((function(t){return t.data}))},update:function(t,e){return b.a.put("".concat(d,"/").concat(t),e).then((function(t){return t.data}))}},O=function(){var t=Object(c.useState)([]),e=Object(u.a)(t,2),n=e[0],o=e[1],r=Object(c.useState)(""),i=Object(u.a)(r,2),f=i[0],b=i[1],d=Object(c.useState)(!1),O=Object(u.a)(d,2),p=O[0],h=O[1],g=Object(c.useState)(null),v=Object(u.a)(g,2),x=v[0],S=v[1];Object(c.useEffect)((function(){console.log("effect"),m.getAll().then((function(t){console.log("promise fulfilled"),o(t)}))}),[]),console.log("render",n.length,"notes");var k=function(){return Object(s.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(s.jsx)("br",{}),Object(s.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})]})},y=p?n:n.filter((function(t){return t.important}));return Object(s.jsxs)("div",{children:[Object(s.jsx)("h1",{children:"Notes"}),Object(s.jsx)(j,{message:x}),Object(s.jsx)("div",{children:Object(s.jsxs)("button",{onClick:function(){return h(!p)},children:["show ",p?"important":"all"]})}),Object(s.jsx)("ul",{children:y.map((function(t){return Object(s.jsx)(l,{note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),c=Object(a.a)(Object(a.a)({},e),{},{important:!e.important});m.update(t,c).then((function(e){o(n.map((function(n){return n.id!==t?n:e})))})).catch((function(c){S("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){S(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))}(t.id)}},t.id)}))}),Object(s.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:f,date:(new Date).toISOString(),important:Math.random()>.5};m.create(e).then((function(t){o(n.concat(t)),b("")}))},children:[Object(s.jsx)("input",{value:f,onChange:function(t){console.log(t.target.value),b(t.target.value)}}),Object(s.jsx)("button",{type:"submit",children:"save"})]}),Object(s.jsx)(k,{})]})};n(39);i.a.render(Object(s.jsx)(o.a.StrictMode,{children:Object(s.jsx)(O,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.ab5002e1.chunk.js.map