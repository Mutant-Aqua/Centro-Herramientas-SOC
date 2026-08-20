const I = {
  cedula:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v16"/></svg>',
  zone:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  temp:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z"/></svg>',
  target:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
  user:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'
};
const arrow='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const TOOLS = [
  {cat:'cedula',ico:'cedula',name:'Cédula de Oficina - Hipotecaria',where:'SISEC',url:'https://dashboardmetas.sisec.mx/dash/?id=18f87d16-427d-4d63-8d4e-8baed508c9a1',desc:'Radiografía de cada oficina hipotecaria: colocación histórica, mezcla de tipos de crédito y participación por banco y estado del canal Hipotecario.'},
  {cat:'cedula',ico:'user',name:'Cédula por Ejecutivo - Hipotecaria',where:'SISEC',url:'https://dashboardmetas.sisec.mx/dash/executive/?id=18f87d16-427d-4d63-8d4e-8baed508c9a1',desc:'La misma radiografía a nivel de ejecutivo: colocación, tipos de crédito y desempeño individual dentro de la oficina Hipotecaria.'},
  {cat:'cedula',ico:'cedula',name:'Cédula de Oficina - PyME',where:'SISEC',url:'https://dashboardmetas.sisec.mx/dash/office/pyme/?id=18f87d16-427d-4d63-8d4e-8baed508c9a1',desc:'Radiografía de cada oficina PyME: colocación histórica, mezcla de tipos de crédito y participación por banco y estado del canal PyME.'},
  {cat:'cedula',ico:'user',name:'Cédula por Ejecutivo - PyME',where:'SISEC',url:'https://dashboardmetas.sisec.mx/dash/executive/pyme/?id=18f87d16-427d-4d63-8d4e-8baed508c9a1',desc:'La misma radiografía a nivel de ejecutivo: colocación, tipos de crédito y desempeño individual dentro de la oficina PyME.'},
  {cat:'pbi',ico:'zone',name:'Marcador Maqueta',where:'Power BI',url:'https://app.powerbi.com/groups/d33b1d21-c936-4934-90d4-3605b121f1df/reports/824fa846-7c2d-4b57-9d0d-1b74d3cea92b?ctid=a13baa9b-7770-42c8-9000-b7b9c4f1364c&pbi_source=linkShare',desc:'Desempeño comercial en torno a los segmentos de facturacion, con indicadores clave de rendimiento.'},
  {cat:'pbi',ico:'temp',name:'Termómetro',where:'Power BI',url:'https://app.powerbi.com/groups/d33b1d21-c936-4934-90d4-3605b121f1df/reports/c0088f63-4874-460a-8c18-65a6973c5212?ctid=a13baa9b-7770-42c8-9000-b7b9c4f1364c&pbi_source=linkShare',desc:'Participación de mercado de SOC en crédito hipotecario frente a la banca y la asociación de brokers.'},
  {cat:'pbi',ico:'target',name:'Cedula de la Oficina',where:'Power BI',url:'https://app.powerbi.com/groups/d33b1d21-c936-4934-90d4-3605b121f1df/reports/ca32e263-2eec-4977-a71b-5d4ac72c5ac9?ctid=a13baa9b-7770-42c8-9000-b7b9c4f1364c&pbi_source=linkShare',desc:'Tablero individual por oficina: visualizacion de la productividad actual del broker - Colocacion, facturación, drivers de actividad, alianzas y venta cruzada.'}
];
const grid=document.getElementById('grid');
const cVar={cedula:'var(--c-cedula)',pbi:'var(--c-pbi)'};
const state={cat:'all',q:''};
function render(){
  const q=state.q.trim().toLowerCase();
  const list=TOOLS.filter(t=>(state.cat==='all'||t.cat===state.cat)&&(!q||t.name.toLowerCase().includes(q)||t.desc.toLowerCase().includes(q)));
  grid.innerHTML='';
  const groups=state.cat==='all'?[['Cédulas','cedula'],['Power BI','pbi']]:[[state.cat==='cedula'?'Cédulas':'Power BI',state.cat]];
  groups.forEach(([label,cat])=>{const items=list.filter(t=>t.cat===cat);if(!items.length)return;const h=document.createElement('div');h.className='sec-title';h.textContent=label;grid.appendChild(h);items.forEach(t=>{const el=document.createElement('article');el.className='card';el.style.setProperty('--cc',cVar[t.cat]);el.innerHTML=`<div class="ctop"><div class="ico">${I[t.ico]}</div><h3>${t.name}</h3></div><p class="desc">${t.desc}</p><div class="cfoot"><span class="tag">${t.where}</span><a class="open" href="${t.url}" target="_blank" rel="noopener">Abrir ${arrow}</a></div>`;grid.appendChild(el);});});
  document.getElementById('cShown').textContent=list.length;
  document.querySelector('[data-c="all"]').textContent=TOOLS.length;
  document.querySelector('[data-c="cedula"]').textContent=TOOLS.filter(t=>t.cat==='cedula').length;
  document.querySelector('[data-c="pbi"]').textContent=TOOLS.filter(t=>t.cat==='pbi').length;
}
document.getElementById('nav').addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;document.querySelectorAll('#nav button').forEach(item=>item.classList.remove('on'));button.classList.add('on');state.cat=button.dataset.cat;render();});
document.getElementById('q').addEventListener('input',event=>{state.q=event.target.value;render();});
render();