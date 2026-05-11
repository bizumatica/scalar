function calcularGeratriz(){const e=document.getElementById("input-decimal").value.replace(",","."),i=document.getElementById("fracao-final"),n=document.getElementById("logica-detalhe");if(!e||isNaN(e)){n.innerText="Por favor, insira um número decimal válido.";return}const a=e.split(".");if(a.length===1){i.innerHTML=`${e}/1`,n.innerHTML="Números inteiros têm denominador 1.";return}const c=a[1].length,t=10**c,s=Math.round(parseFloat(e)*t),r=(e,t)=>t===0?e:r(t,e%t),o=r(s,t),l=s/o,d=t/o;i.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
            <span>${l}</span>
            <div style="width: 100%; height: 2px; background: var(--primary);"></div>
            <span>${d}</span>
        </div>
    `,n.innerHTML=`
        <p>1. Transformado em <strong>${s}/${t}</strong></p>
        <p>2. MDC encontrado: <strong>${o}</strong></p>
        <p>3. Fração simplificada com sucesso.</p>
    `}document.getElementById("btn-resolver").addEventListener("click",calcularGeratriz)