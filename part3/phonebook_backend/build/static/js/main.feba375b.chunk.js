(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(2),r=t.n(c),a=t(15),o=t.n(a),u=t(6),i=t(3),s=t(4),d=t.n(s),l="/api/persons",j={getAll:function(){return d.a.get(l).then((function(e){return e.data}))},create:function(e){return d.a.post(l,e).then((function(e){return e.data}))},update:function(e,n){return d.a.put("".concat(l,"/").concat(e),n).then((function(e){return e.data}))},drop:function(e){return d.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))}},b=t(0),f=function(e){var n=e.filter,t=e.onChange;return Object(b.jsxs)("div",{children:["filter shown with",Object(b.jsx)("input",{value:n,onChange:t})]})},h=function(e){var n=e.newName,t=e.handleNameChange,c=e.newNumber,r=e.handleNumberChange,a=e.handleSubmit;return Object(b.jsxs)("form",{onSubmit:a,children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{value:n,onChange:t})]}),Object(b.jsxs)("div",{children:["number: ",Object(b.jsx)("input",{value:c,onChange:r})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:"add"})})]})},m=function(e){var n=e.persons,t=e.setPersons,c=e.setMessage,r=e.filter;return Object(b.jsx)(b.Fragment,{children:n.filter((function(e){return""===r||-1!==e.name.toLowerCase().search(r.toLowerCase())})).map((function(e){return Object(b.jsxs)("p",{children:[e.name," ",e.number," ",Object(b.jsx)("button",{onClick:function(){return function(e){window.confirm("Delete ".concat(e.name," ?"))&&j.drop(e.id).then((function(r){t(n.filter((function(n){return n.id!==e.id}))),c({text:"Deleted ".concat(e.name),type:"info"}),setTimeout((function(){c(null)}),5e3)}))}(e)},children:"delete"})]},e.name)}))})},O=function(e){var n=e.message;return Object(b.jsx)(b.Fragment,{children:n&&Object(b.jsx)("div",{className:"".concat(n.type," message"),children:n.text})})},p=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),o=Object(i.a)(a,2),s=o[0],d=o[1],l=Object(c.useState)(null),p=Object(i.a)(l,2),x=p[0],g=p[1],v=Object(c.useState)(""),w=Object(i.a)(v,2),C=w[0],N=w[1],y=Object(c.useState)(""),S=Object(i.a)(y,2),k=S[0],A=S[1];Object(c.useEffect)((function(){j.getAll().then((function(e){return r(e)}))}),[]);return Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Phonebook"}),Object(b.jsx)(O,{message:x}),Object(b.jsx)(f,{filter:k,onChange:function(e){return A(e.target.value)}}),Object(b.jsx)("h3",{children:"Add a new"}),Object(b.jsx)(h,{handleSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===s}));if(n)window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))&&j.update(n.id,Object(u.a)(Object(u.a)({},n),{},{number:C})).then((function(e){r(t.map((function(n){return n.id===e.id?e:n}))),d(""),N(""),g({text:"Updated ".concat(e.name),type:"info"}),setTimeout((function(){g(null)}),5e3)})).catch((function(e){g({text:"Information of ".concat(n.name," has already been removed from server"),type:"error"}),setTimeout((function(){g(null)}),5e3)}));else{var c={name:s,number:C};j.create(c).then((function(e){r(t.concat(e)),d(""),N(""),g({text:"Added ".concat(e.name),type:"info"}),setTimeout((function(){g(null)}),5e3)}))}},newName:s,handleNameChange:function(e){return d(e.target.value)},newNumber:C,handleNumberChange:function(e){return N(e.target.value)}}),Object(b.jsx)("h2",{children:"Numbers"}),Object(b.jsx)(m,{filter:k,persons:t,setPersons:r,setMessage:g})]})};t(39);o.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(p,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.feba375b.chunk.js.map