const f=document.createElement("style");f.textContent=`
  .post-card, .featured-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  .post-card.filtering-out {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
    pointer-events: none;
  }

  .post-card.filtering-in {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  .post-card.filtering-prepare {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
    display: block !important;
  }

  .post-card.filtering-animate-in {
    opacity: 1;
    transform: scale(1) translateY(0);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Featured section uses height collapse to preserve layout while removing space */
  .featured-section.filtering-out {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
    pointer-events: none;
    height: 0 !important;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
    overflow: hidden;
  }

  .featured-section.filtering-in {
    opacity: 1;
    transform: scale(1) translateY(0);
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .featured-section.filtering-prepare {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
    padding-top: 3rem;
    padding-bottom: 3rem;
    overflow: hidden;
  }

  .featured-section.filtering-animate-in {
    opacity: 1;
    transform: scale(1) translateY(0);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .posts-grid {
    transition: all 0.3s ease;
  }

  .featured-section {
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                padding 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                margin 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  .category-button {
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    outline: none;
    text-decoration: none;
  }

  .category-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(77, 187, 250, 0.3);
  }
`;document.head.appendChild(f);function u(i){console.log("Filtering by category:",i);const c=window.scrollY,a=document.querySelectorAll(".post-card"),o=document.querySelector(".featured-card");document.querySelectorAll(".category-button").forEach(e=>{e.classList.remove("active"),e.dataset.category===i&&e.classList.add("active")});const s=[],l=[];if(o){const e=o.closest(".featured-section"),n=o.dataset.categories?o.dataset.categories.split(","):[];i==="all"||n.includes(i)?s.push({element:e,section:null,isFeatured:!0}):l.push({element:e,section:null,isFeatured:!0})}a.forEach(e=>{const n=e.dataset.categories?e.dataset.categories.split(","):[];i==="all"||n.includes(i)?s.push({element:e,section:null}):l.push({element:e,section:null})}),l.forEach(({element:e,section:n,isFeatured:t})=>{if(t){const d=e.offsetHeight;e.style.height=d+"px",e.offsetHeight,e.classList.remove("filtering-in","filtering-animate-in"),e.classList.add("filtering-out")}else e.classList.remove("filtering-in","filtering-animate-in"),e.classList.add("filtering-out"),setTimeout(()=>{e.classList.contains("filtering-out")&&(e.style.display="none")},400)}),setTimeout(()=>{const e=s.filter(({isFeatured:t})=>t),n=s.filter(({isFeatured:t})=>!t);e.forEach(({element:t})=>{t.classList.remove("filtering-out","filtering-in"),t.classList.add("filtering-prepare"),t.style.height="auto",setTimeout(()=>{t.classList.remove("filtering-prepare"),t.classList.add("filtering-animate-in"),setTimeout(()=>{t.classList.remove("filtering-animate-in"),t.classList.add("filtering-in"),t.style.height=""},500)},50)}),n.forEach(({element:t},d)=>{t.classList.remove("filtering-out","filtering-in"),t.classList.add("filtering-prepare"),t.style.display="block",setTimeout(()=>{t.classList.remove("filtering-prepare"),t.classList.add("filtering-animate-in"),setTimeout(()=>{t.classList.remove("filtering-animate-in"),t.classList.add("filtering-in")},500)},200+d*80)})},200);const g=i==="all"?"/blog":`/blog?category=${i}`;window.history.pushState({category:i},"",g),setTimeout(()=>{window.scrollTo(0,c)},50)}document.addEventListener("DOMContentLoaded",function(){console.log("Setting up category filtering..."),document.querySelectorAll(".category-button").forEach(o=>{o.addEventListener("click",function(r){r.preventDefault(),r.stopPropagation(),r.stopImmediatePropagation();const s=this.dataset.category;return console.log("Category button clicked:",s),u(s),!1}),o.addEventListener("mousedown",function(r){r.preventDefault()})});const a=new URLSearchParams(window.location.search).get("category");a&&u(a)});window.addEventListener("popstate",function(i){const a=new URLSearchParams(window.location.search).get("category")||"all";u(a)});
