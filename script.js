// FIX: All JS is now in a single script block to ensure correct initialization order.
        document.addEventListener('DOMContentLoaded', () => {
            // --- DOM ELEMENTS ---
            const themeToggleButton = document.getElementById('theme-toggle-btn');
            const themeIconSun = document.getElementById('theme-icon-sun');
            const themeIconMoon = document.getElementById('theme-icon-moon');
            const unitToggleButton = document.getElementById('unit-toggle');
            const learnModeCheckbox = document.getElementById('learn-mode-checkbox');
            const mainBody = document.querySelector('body');
            const tabs = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');
            const cPrimeInput = document.getElementById('c_prime'), 
                  phiDegInput = document.getElementById('phi_deg'), 
                  gammaValInput = document.getElementById('gamma_val'), 
                  gwtCheckbox = document.getElementById('gwt_checkbox'), 
                  gwtInputsDiv = document.getElementById('gwt_inputs'), 
                  dwValInput = document.getElementById('dw_val'), 
                  gammaSatValInput = document.getElementById('gamma_sat_val'), 
                  DfValInput = document.getElementById('Df_val'), 
                  BValInput = document.getElementById('B_val'), 
                  foundationShapeSelect = document.getElementById('foundation_shape'), 
                  hfInput = document.getElementById('h_f'), 
                  colBInput = document.getElementById('col_b'), 
                  colLInput = document.getElementById('col_l'), 
                  FSInput = document.getElementById('FS_val'), 
                  calculateButton = document.getElementById('calculateButton'), 
                  assumptionWarningBox = document.getElementById('assumptionWarningBox'), 
                  resultsBox = document.getElementById('resultsBox'), 
                  quOutput = document.getElementById('qu_output'), 
                  qallOutput = document.getElementById('qall_output'), 
                  pNetOutput = document.getElementById('p_net_output'), 
                  stripQallOutput = document.getElementById('strip_qall_output'), 
                  factorsOutput = document.getElementById('factors_output'), 
                  netLoadResultDiv = document.getElementById('netLoadResult'), 
                  stripLoadResultDiv = document.getElementById('stripLoadResult'), 
                  sectionCanvas = document.getElementById('foundationSectionCanvas'), 
                  planCanvas = document.getElementById('foundationPlanCanvas'),
                  failureMechanismCanvas = document.getElementById('failureMechanismCanvas'),
                  colLDiv = document.getElementById('col_l_div'),
                  colBLabel = document.getElementById('col_b_label');
            const solutionContainer = document.getElementById('solution-steps-container');
            const foundationNameInput = document.getElementById('foundation-name'), foundationIndexInput = document.getElementById('foundation-index');
            const boqExcavationQty = document.getElementById('boq-excavation-qty'), boqConcreteQty = document.getElementById('boq-concrete-qty'), boqFormworkQty = document.getElementById('boq-formwork-qty'), boqSteelQty = document.getElementById('boq-steel-qty'), boqExcavationPrice = document.getElementById('boq-excavation-price'), boqConcretePrice = document.getElementById('boq-concrete-price'), boqFormworkPrice = document.getElementById('boq-formwork-price'), boqSteelPrice = document.getElementById('boq-steel-price'), boqExcavationTotal = document.getElementById('boq-excavation-total'), boqConcreteTotal = document.getElementById('boq-concrete-total'), boqFormworkTotal = document.getElementById('boq-formwork-total'), boqSteelTotal = document.getElementById('boq-steel-total'), steelCalcMethodRadios = document.querySelectorAll('input[name="steel-calc-method"]'), steelRatioInputs = document.getElementById('steel-ratio-inputs'), steelTotalInputs = document.getElementById('steel-total-inputs'), steelRatioInput = document.getElementById('steel-ratio'), steelTotalWeightInput = document.getElementById('steel-total-weight'), addToAccountButton = document.getElementById('addToAccountButton');
            const stripLengthInput = document.getElementById('strip-foundation-length');
            const quantitiesMaterialsBody = document.querySelector('#quantities-summary-materials tbody');
            const quantitiesOthersBody = document.querySelector('#quantities-summary-others tbody');
            const finalAccountTableBody = document.getElementById('final-account-table-body'), addCustomItemButton = document.getElementById('addCustomItemButton'), clearAccountButton = document.getElementById('clearAccountButton'), customItemDesc = document.getElementById('custom-item-desc'), customItemQty = document.getElementById('custom-item-qty'), customItemUnit = document.getElementById('custom-item-unit'), customItemPrice = document.getElementById('custom-item-price');
            const unforeseenPercentInput = document.getElementById('unforeseen-percent'), retentionPercentInput = document.getElementById('retention-percent'), vatPercentInput = document.getElementById('vat-percent');
            const summaryDirectCost = document.getElementById('summary-direct-cost'), summaryUnforeseenValue = document.getElementById('summary-unforeseen-value'), summarySubtotal = document.getElementById('summary-subtotal'), summaryRetentionValue = document.getElementById('summary-retention-value'), summaryVatValue = document.getElementById('summary-vat-value'), summaryFinalTotal = document.getElementById('summary-final-total');
            const calcModeBtn = document.getElementById('calc-mode-btn');
            const designModeBtn = document.getElementById('design-mode-btn');
            const designInputsDiv = document.getElementById('design-inputs');
            const requiredLoadInput = document.getElementById('required_load');
            const bValInputContainer = document.getElementById('b_input_container');
            const designResultTextDiv = document.getElementById('designResultText');
            const designBOutput = document.getElementById('design_b_output');
            const designCostOutput = document.getElementById('design_cost_output');
            const graphContainer = document.getElementById('graph-container');
            const bearingCapacityChartCanvas = document.getElementById('bearingCapacityChart');
            const imageModal = document.getElementById('image-modal');
            const modalImage = document.getElementById('modal-image');
            const imageModalCloseBtn = imageModal.querySelector('.modal-close-btn');
            const confirmModal = document.getElementById('confirm-modal');
            const confirmModalText = document.getElementById('confirm-modal-text');
            const confirmModalYes = document.getElementById('confirm-modal-yes');
            const confirmModalNo = document.getElementById('confirm-modal-no');
            const confirmModalClose = document.getElementById('confirm-modal-close');
            const exportPdfBtn = document.getElementById('export-pdf-btn');
            const exportDocBtn = document.getElementById('export-doc-btn');
            const exportXlsBtn = document.getElementById('export-xls-btn');

            let lastCalculationResult = {};
            let currentBoq = {};
            let finalAccountGroups = []; 
            let currentMode = 'analysis'; 
            let bearingChart; 
            let currentUnitSystem = 'kpa'; 
            const KPA_PER_TON = 10;
            
            // --- LOCAL STORAGE FUNCTIONS ---
            function saveAccountToStorage() { localStorage.setItem('finalAccountGroups_v3', JSON.stringify(finalAccountGroups)); }
            function loadAccountFromStorage() { const savedData = localStorage.getItem('finalAccountGroups_v3'); if (savedData) { finalAccountGroups = JSON.parse(savedData); } else { finalAccountGroups = []; } }
            
            // --- THEME & UI LOGIC ---
            const applyTheme = (theme) => { if (theme === 'dark') { document.documentElement.classList.add('dark'); themeIconSun.classList.add('hidden'); themeIconMoon.classList.remove('hidden'); } else { document.documentElement.classList.remove('dark'); themeIconSun.classList.remove('hidden'); themeIconMoon.classList.add('hidden'); } drawAllCanvases(); };
            themeToggleButton.addEventListener('click', () => { const isDark = document.documentElement.classList.toggle('dark'); const newTheme = isDark ? 'dark' : 'light'; localStorage.setItem('theme', newTheme); applyTheme(newTheme); });
            learnModeCheckbox.addEventListener('change', () => { mainBody.classList.toggle('learn-mode-active', learnModeCheckbox.checked); });
            const applyUnitSystem = (system) => { currentUnitSystem = system; unitToggleButton.classList.toggle('kpa-active', system === 'kpa'); unitToggleButton.classList.toggle('ton-active', system === 'ton'); const pressureUnit = system === 'kpa' ? 'kPa' : 't/m²'; const densityUnit = system === 'kpa' ? 'kN/m³' : 't/m³'; const loadUnit = system === 'kpa' ? 'kN' : 't'; const lineLoadUnit = system === 'kpa' ? 'kN/m' : 't/m'; document.getElementById('c-prime-unit-label').textContent = `[${pressureUnit}]`; document.getElementById('gamma-unit-label').textContent = `[${densityUnit}]`; document.getElementById('gamma-sat-unit-label').textContent = `[${densityUnit}]`; document.querySelector('.q-all-label').nextSibling.textContent = ` [${pressureUnit}]`; document.querySelector('.qu-label').nextSibling.textContent = ` [${pressureUnit}]`; document.querySelector('.p-net-label').nextSibling.textContent = ` [${loadUnit}]`; document.querySelector('.q-strip-label').nextSibling.textContent = ` [${lineLoadUnit}]`; if(lastCalculationResult.qu) { animateResults(lastCalculationResult); } if(bearingChart) { updateGraph(); } };
            unitToggleButton.addEventListener('click', () => { const newSystem = currentUnitSystem === 'kpa' ? 'ton' : 'kpa'; const cPrimeVal = parseFloat(cPrimeInput.value); const gammaVal = parseFloat(gammaValInput.value); const gammaSatVal = parseFloat(gammaSatValInput.value); if (newSystem === 'ton') { if(!isNaN(cPrimeVal)) cPrimeInput.value = (cPrimeVal / KPA_PER_TON).toFixed(2); if(!isNaN(gammaVal)) gammaValInput.value = (gammaVal / KPA_PER_TON).toFixed(2); if(!isNaN(gammaSatVal)) gammaSatValInput.value = (gammaSatVal / KPA_PER_TON).toFixed(2); } else { if(!isNaN(cPrimeVal)) cPrimeInput.value = (cPrimeVal * KPA_PER_TON).toFixed(2); if(!isNaN(gammaVal)) gammaValInput.value = (gammaVal * KPA_PER_TON).toFixed(2); if(!isNaN(gammaSatVal)) gammaSatValInput.value = (gammaSatVal * KPA_PER_TON).toFixed(2); } localStorage.setItem('unitSystem', newSystem); applyUnitSystem(newSystem); performCalculationAndDraw(); });
            tabs.forEach(tab => { tab.addEventListener('click', () => { const target = tab.dataset.tab; tabs.forEach(t => t.classList.remove('active')); tab.classList.add('active'); tabContents.forEach(content => content.classList.toggle('active', content.id === target)); if (target === 'cost-estimation-tab') { updateCostTabDimensions(); updateBoq(getInputs()); } if (target === 'final-account-tab') renderFinalAccount(); if (target === 'solution-tab') populateSolutionTab(lastCalculationResult); if (target === 'quantities-summary-tab') renderQuantitiesSummary(); }); });
            
            // --- MODAL LOGIC ---
            function openImageInModal(canvasElement) { const dataUrl = canvasElement.toDataURL('image/png', 1.0); modalImage.src = dataUrl; imageModal.classList.add('visible'); }
            function showConfirmationModal(text, callback) { confirmModalText.textContent = text; confirmModal.classList.add('visible'); confirmModalYes.onclick = () => { callback(true); confirmModal.classList.remove('visible'); }; confirmModalNo.onclick = () => { callback(false); confirmModal.classList.remove('visible'); }; confirmModalClose.onclick = () => { callback(false); confirmModal.classList.remove('visible'); }; }
            imageModalCloseBtn.addEventListener('click', () => imageModal.classList.remove('visible'));
            imageModal.addEventListener('click', (e) => { if(e.target === imageModal) { imageModal.classList.remove('visible'); } });

            // --- MODE SWITCHER LOGIC ---
            function switchMode(mode) { currentMode = mode; if (mode === 'analysis') { calcModeBtn.classList.add('active'); designModeBtn.classList.remove('active'); designInputsDiv.classList.add('hidden'); bValInputContainer.classList.remove('hidden'); calculateButton.textContent = 'חשב'; designResultTextDiv.classList.add('hidden'); graphContainer.classList.toggle('hidden', !bearingChart); } else { designModeBtn.classList.add('active'); calcModeBtn.classList.remove('active'); designInputsDiv.classList.remove('hidden'); bValInputContainer.classList.add('hidden'); calculateButton.textContent = 'תכנן רוחב יסוד'; graphContainer.classList.add('hidden'); } }
            calcModeBtn.addEventListener('click', () => switchMode('analysis'));
            designModeBtn.addEventListener('click', () => switchMode('design'));

            // --- ENGINEERING CALCULATION LOGIC ---
            const terzaghiFactorsTable={0:{Nc:5.7,Nq:1,N_gamma:0},5:{Nc:7.3,Nq:1.6,N_gamma:0.5},10:{Nc:9.6,Nq:2.7,N_gamma:1.2},15:{Nc:12.9,Nq:4.4,N_gamma:2.5},20:{Nc:17.7,Nq:7.4,N_gamma:5},25:{Nc:25.1,Nq:12.7,N_gamma:9.7},30:{Nc:37.2,Nq:22.5,N_gamma:19.7},34:{Nc:52.6,Nq:36.5,N_gamma:35},35:{Nc:57.8,Nq:41.4,N_gamma:42.4},40:{Nc:95.7,Nq:81.3,N_gamma:100.4},45:{Nc:172.3,Nq:173.3,N_gamma:297.5}};
            function linearInterpolate(x,x0,y0,x1,y1){if(x1===x0)return y0;return y0+(x-x0)*(y1-y0)/(x1-x0)}
            function getBearingCapacityFactors(p){p=parseFloat(p);const v=Object.keys(terzaghiFactorsTable).map(Number).sort((a,b)=>a-b);if(p<v[0]||p>v[v.length-1]||isNaN(p)){return{Nc:NaN,Nq:NaN,N_gamma:NaN}}if(terzaghiFactorsTable.hasOwnProperty(p))return{...terzaghiFactorsTable[p],interpolated:false};let x0,x1;for(let i=0;i<v.length-1;i++){if(p>=v[i]&&p<v[i+1]){x0=v[i];x1=v[i+1];break}}if(x0===undefined||x1===undefined)return{Nc:NaN,Nq:NaN,N_gamma:NaN};const f0=terzaghiFactorsTable[x0],f1=terzaghiFactorsTable[x1];return{Nc:linearInterpolate(p,x0,f0.Nc,x1,f1.Nc),Nq:linearInterpolate(p,x0,f0.Nq,x1,f1.Nq),N_gamma:linearInterpolate(p,x0,f0.N_gamma,x1,f1.N_gamma),interpolated:true,x0,f0,x1,f1}}
            function getShapeFactors(s){let sc=NaN,sq=NaN,sg=NaN;switch(s.toLowerCase()){case"strip":sc=1;sq=1;sg=1;break;case"square":sc=1.3;sq=1;sg=0.8;break;case"circular":sc=1.3;sq=1;sg=0.6;break;}return{s_c:sc,s_q:sq,s_gamma:sg}}
            function terzaghiBearingCapacity(data){let{c,phi,gamma,Df,B,shape,useGWT,Dw,gamma_sat}=data;c=parseFloat(c);phi=parseFloat(phi);gamma=parseFloat(gamma);Df=parseFloat(Df);B=parseFloat(B);Dw=parseFloat(Dw);gamma_sat=parseFloat(gamma_sat);if([c,phi,gamma,Df,B].some(isNaN)||Df<0||B<=0||gamma<=0||c<0)return{q_u:NaN};if(useGWT&&[Dw,gamma_sat].some(isNaN))return{q_u:NaN};let factors=getBearingCapacityFactors(phi);if(phi===0)factors={Nc:5.7,Nq:1,N_gamma:0,interpolated:false};const shapeFactors=getShapeFactors(shape);if([factors.Nc,factors.Nq,factors.N_gamma].some(isNaN)||Object.values(shapeFactors).some(isNaN))return{q_u:NaN,factors};const phi_rad=phi*(Math.PI/180);const z=(B/2)*Math.tan(Math.PI/4+phi_rad/2);let q_eff,gamma_eff,gwtCase=0;if(!useGWT){gwtCase=1.2;q_eff=gamma*Df;gamma_eff=gamma}else{const gamma_w=9.81;const gamma_sub=gamma_sat-gamma_w;if(Dw<=0){gwtCase=2.1;q_eff=gamma_sub*Df;gamma_eff=gamma_sub}else if(Dw<Df){gwtCase=2.2;q_eff=(gamma*Dw)+(gamma_sub*(Df-Dw));gamma_eff=gamma_sub}else if(Dw<=Df+B){gwtCase=3;q_eff=gamma*Df;gamma_eff=gamma_sub+((Dw-Df)/B)*(gamma-gamma_sub)}else{gwtCase=1.2;q_eff=gamma*Df;gamma_eff=gamma}}const{Nc,Nq,N_gamma}=factors;const{s_c,s_q,s_gamma}=shapeFactors;const term1=c*Nc*s_c;const term2=q_eff*Nq*s_q;const term3=0.5*gamma_eff*B*N_gamma*s_gamma;const q_u=term1+term2+term3;return{q_u,factors,intermediates:{q_eff,gamma_eff,z,gwtCase,...shapeFactors}}}
            function calculateAllowableLoad(params) { const {q_u} = terzaghiBearingCapacity(params); if (isNaN(q_u) || params.FS <= 0) return NaN; const qall = q_u / params.FS; if (params.shape === 'strip') { return qall * params.B; } else { const { B, hf, col_b, col_l, Df, gamma } = params; const gamma_c = 22.56; const A_foundation = (params.shape === 'square') ? B * B : Math.PI * (B/2)**2; const W_foundation = A_foundation * hf * gamma_c; const A_column = (params.shape === 'circular') ? (Math.PI * (col_b/2)**2) : (col_b * col_l); const soilHeightOverFoundation = Math.max(0, Df - hf); const W_soil = (A_foundation - A_column) * soilHeightOverFoundation * gamma; const P_gross_all = qall * A_foundation; return P_gross_all - W_foundation - W_soil; } }
            
            function performDesignCalculation() {
                const requiredLoadRaw = parseFloat(requiredLoadInput.value);
                if (isNaN(requiredLoadRaw) || requiredLoadRaw <= 0) {
                    alert('אנא הזן עומס תכן נדרש חוקי וחיובי.');
                    return;
                }
                const requiredLoad = currentUnitSystem === 'ton' ? requiredLoadRaw * KPA_PER_TON : requiredLoadRaw;
                let params = getInputs();
                let b = 0.5, p_net_all = 0;
                const maxIterations = 200;
                let iteration = 0, found = false;

                while(iteration < maxIterations && b <= 20) {
                    params.B = b;
                    p_net_all = calculateAllowableLoad(params);
                    if (!isNaN(p_net_all) && p_net_all >= requiredLoad) {
                        found = true;
                        break;
                    }
                    b += 0.05; // Increment B and try again
                    iteration++;
                }

                if (!found) {
                    alert('לא נמצא פתרון. אנא בדוק את נתוני הקלט.');
                    return;
                }
                
                const roundedB = Math.ceil(b * 20) / 20;
                BValInput.value = roundedB.toFixed(2);
                
                updateBoq(getInputs()); // Update quantities with the new dimension
                const estimatedCost = currentBoq.reduce((sum, item) => sum + (item.qty * item.price), 0);

                designResultTextDiv.classList.remove('hidden');
                designBOutput.textContent = `רוחב יסוד מומלץ (B) = ${roundedB.toFixed(2)} מ'`;
                designCostOutput.textContent = `עלות ישירה מוערכת ליסוד: ${estimatedCost.toLocaleString('he-IL', {style: 'currency', currency: 'ILS'})}`;

                performCalculationAndDraw(true);
            }
            
            // --- DRAWING FUNCTIONS ---
            function drawAllCanvases() {
                drawFoundationSection();
                drawFoundationPlan();
                drawFailureMechanism();
                if (bearingChart) updateGraph();
            }

            function drawFoundationSection(){const Df=parseFloat(DfValInput.value),B=parseFloat(BValInput.value);const hf=parseFloat(hfInput.value)/100,col_b=parseFloat(colBInput.value)/100;const useGWT=gwtCheckbox.checked;const Dw=parseFloat(dwValInput.value);const cw=sectionCanvas.width,ch=sectionCanvas.height;sectionCanvas.getContext('2d').clearRect(0,0,cw,ch);const ctx=sectionCanvas.getContext('2d');const isDark=document.documentElement.classList.contains('dark');ctx.fillStyle=isDark?'#1F2937':'#F9FAFB';ctx.fillRect(0,0,cw,ch);if(isNaN(Df)||isNaN(B)||Df<0||B<=0)return;const gLvlY=50,sPadB=40,maxDepth=Math.max(2,Df*1.5,B*1.5,useGWT?Dw*1.2:0),maxWidth=Math.max(2,B*1.5);const scaleY=(ch-gLvlY-sPadB)/maxDepth,scaleX=cw/maxWidth;const effScale=Math.min(scaleX,scaleY)*0.8;const Dfs=Df*effScale,Bs=B*effScale,Dws=Dw*effScale,hf_s=hf*effScale,col_b_s=col_b*effScale;if(useGWT&&!isNaN(Dw)&&Dw>=0){const gwtY=gLvlY+Dws;ctx.fillStyle=isDark?'rgba(99, 102, 241, 0.2)':'rgba(173,216,230,0.4)';ctx.fillRect(0,gwtY,cw,ch-gwtY);ctx.beginPath();ctx.setLineDash([5,3]);ctx.moveTo(0,gwtY);ctx.lineTo(cw,gwtY);ctx.strokeStyle=isDark?'#A5B4FC':'#0077be';ctx.lineWidth=1.5;ctx.stroke();ctx.setLineDash([]);ctx.font='13px Assistant';ctx.fillStyle=isDark?'#C7D2FE':'#005a8d';ctx.textAlign='left';ctx.fillText(`∇ (Dₒ=${Dw.toFixed(1)}m)`,15,gwtY-5)}ctx.beginPath();ctx.moveTo(0,gLvlY);ctx.lineTo(cw,gLvlY);ctx.strokeStyle='#A0522D';ctx.lineWidth=2;ctx.stroke();ctx.font='13px Assistant';ctx.fillStyle=isDark?'#E5E7EB':'#1F2937';ctx.textAlign='left';ctx.fillText('פני הקרקע',5,gLvlY-8);const fBaseY=gLvlY+Dfs,fTopY=fBaseY-hf_s,fX=(cw-Bs)/2;ctx.fillStyle='#A9A9A9';ctx.fillRect(fX,fTopY,Bs,hf_s);ctx.strokeStyle='#696969';ctx.lineWidth=1;ctx.strokeRect(fX,fTopY,Bs,hf_s);const colX=(cw-col_b_s)/2;if(!isNaN(col_b_s)&&col_b_s>0){ctx.fillStyle='#D3D3D3';ctx.fillRect(colX,20,col_b_s,fTopY-20);ctx.strokeRect(colX,20,col_b_s,fTopY-20)}if(lastCalculationResult&&typeof lastCalculationResult.p_net_all==='number'&&lastCalculationResult.shape!=='strip'){let p=lastCalculationResult.p_net_all;let loadUnit=currentUnitSystem==='kpa'?'kN':'t';if(currentUnitSystem==='ton')p/=KPA_PER_TON;const text=`P = ${p.toFixed(1)} ${loadUnit}`;const arrowStartY=20,arrowEndY=fTopY-2;ctx.fillStyle='#ef4444';ctx.font='bold 12px Assistant';ctx.textAlign='center';ctx.fillText(text,colX+col_b_s/2,arrowStartY-8);ctx.beginPath();ctx.moveTo(colX+col_b_s/2,arrowStartY);ctx.lineTo(colX+col_b_s/2,arrowEndY);ctx.strokeStyle='#ef4444';ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.moveTo(colX+col_b_s/2,arrowEndY);ctx.lineTo(colX+col_b_s/2-5,arrowEndY-5);ctx.moveTo(colX+col_b_s/2,arrowEndY);ctx.lineTo(colX+col_b_s/2+5,arrowEndY-5);ctx.stroke()}ctx.fillStyle=isDark?'#E5E7EB':'#1F2937';if(Dfs>10){const dimX=fX-25;if(dimX>0){ctx.beginPath();ctx.moveTo(dimX,gLvlY);ctx.lineTo(dimX,fBaseY);ctx.strokeStyle='black';ctx.lineWidth=1;ctx.stroke();ctx.moveTo(dimX-5,gLvlY+2);ctx.lineTo(dimX,gLvlY);ctx.lineTo(dimX+5,gLvlY+2);ctx.moveTo(dimX-5,fBaseY-2);ctx.lineTo(dimX,fBaseY);ctx.lineTo(dimX+5,fBaseY-2);ctx.stroke();ctx.textAlign='center';ctx.fillText(`Df=${Df.toFixed(1)}m`,dimX-20,gLvlY+Dfs/2+5)}}if(Bs>10){const B_lblY=fBaseY+15;if(B_lblY<ch-15){ctx.beginPath();ctx.moveTo(fX,B_lblY);ctx.lineTo(fX+Bs,B_lblY);ctx.strokeStyle='black';ctx.lineWidth=1;ctx.stroke();ctx.moveTo(fX+2,B_lblY-5);ctx.lineTo(fX,B_lblY);ctx.lineTo(fX+2,B_lblY+5);ctx.moveTo(fX+Bs-2,B_lblY-5);ctx.lineTo(fX+Bs,B_lblY);ctx.lineTo(fX+Bs-2,B_lblY+5);ctx.stroke();ctx.textAlign='center';ctx.fillText(`B=${B.toFixed(1)}m`,fX+Bs/2,B_lblY+15)}}}
            function drawFoundationPlan(){const B=parseFloat(BValInput.value),shape=foundationShapeSelect.value;const col_b=parseFloat(colBInput.value)/100,col_l=parseFloat(colLInput.value)/100;const cw=planCanvas.width,ch=planCanvas.height;planCanvas.getContext('2d').clearRect(0,0,cw,ch); const ctx=planCanvas.getContext('2d'); const isDark=document.documentElement.classList.contains('dark');ctx.fillStyle=isDark?'#374151':'#4B5563';ctx.fillRect(0,0,cw,ch);if(isNaN(B)||B<=0){return}const pad=30,availW=cw-2*pad,availH=ch-2*pad;let scale=Math.min(availW/B,availH/B)*0.9;const Bs=B*scale,cX=cw/2,cY=ch/2;const textColor=isDark?'#E5E7EB':'#1F2937';ctx.strokeStyle='#696969';ctx.fillStyle='#C0C0C0';ctx.lineWidth=2;ctx.font='13px Assistant';ctx.textAlign='center';if(shape==="square"){ctx.fillRect(cX-Bs/2,cY-Bs/2,Bs,Bs);ctx.strokeRect(cX-Bs/2,cY-Bs/2,Bs,Bs);ctx.fillStyle=textColor;ctx.fillText(`B=${B.toFixed(1)}m`,cX,cY+Bs/2+15)}else if(shape==="circular"){const rad_s=Bs/2;ctx.beginPath();ctx.arc(cX,cY,rad_s,0,2*Math.PI);ctx.fill();ctx.stroke();ctx.fillStyle=textColor;ctx.fillText(`קוטר=${B.toFixed(1)}m`,cX,cY+rad_s+15)}else if(shape==="strip"){const len_s=Math.min(Bs*2.5,availW*0.9);ctx.fillRect(cX-len_s/2,cY-Bs/2,len_s,Bs);ctx.strokeRect(cX-len_s/2,cY-Bs/2,len_s,Bs);ctx.fillStyle=textColor;ctx.fillText(`B=${B.toFixed(1)}m`,cX,cY-Bs/2-10);ctx.fillText(`(יסוד נמשך)`,cX,cY+Bs/2+15)}if(!isNaN(col_b)&&col_b>0){ctx.fillStyle='#A9A9A9';const col_b_s=col_b*scale;if(shape==='strip'){const len_s=Math.min(Bs*2.5,availW*0.9);ctx.fillRect(cX-len_s/2,cY-col_b_s/2,len_s,col_b_s)}else if(shape==='circular'){ctx.beginPath();ctx.arc(cX,cY,col_b_s/2,0,2*Math.PI);ctx.fill()}else{const col_l_s=col_l*scale;ctx.fillRect(cX-col_b_s/2,cY-col_l_s/2,col_b_s,col_l_s)}}if(lastCalculationResult&&typeof lastCalculationResult.p_net_all==='number'&&lastCalculationResult.shape!=='strip'){ctx.strokeStyle='#ef4444';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(cX,cY,8,0,2*Math.PI);ctx.moveTo(cX-12,cY);ctx.lineTo(cX+12,cY);ctx.moveTo(cX,cY-12);ctx.lineTo(cX,cY+12);ctx.stroke()}}

            function drawFailureMechanism() {
                const B = parseFloat(BValInput.value) || 2;
                const phi = parseFloat(phiDegInput.value) || 25;
                const phiRad = phi * (Math.PI / 180);
                const ctx = failureMechanismCanvas.getContext('2d');
                const cw = failureMechanismCanvas.width, ch = failureMechanismCanvas.height;
                const isDark = document.documentElement.classList.contains('dark');
                
                ctx.clearRect(0, 0, cw, ch);
                ctx.fillStyle = isDark ? '#1F2937' : '#F9FAFB';
                ctx.fillRect(0, 0, cw, ch);

                const foundationWidth = cw * 0.4;
                const foundationHeight = 20;
                const startX = (cw - foundationWidth) / 2;
                const groundLevelY = ch * 0.3;

                ctx.fillStyle = isDark ? '#6B7280' : '#A9A9A9';
                ctx.fillRect(startX, groundLevelY - foundationHeight, foundationWidth, foundationHeight);

                ctx.beginPath();
                ctx.moveTo(0, groundLevelY);
                ctx.lineTo(cw, groundLevelY);
                ctx.strokeStyle = isDark ? '#9CA3AF' : '#6B7280';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                const p1 = { x: startX, y: groundLevelY };
                const p2 = { x: startX + foundationWidth, y: groundLevelY };
                
                const alpha1 = (Math.PI / 4) + (phiRad / 2);
                const alpha2 = (Math.PI / 4) - (phiRad / 2);

                const h_wedge = (foundationWidth / 2) * Math.tan(phiRad);
                const p3 = { x: startX + foundationWidth / 2, y: groundLevelY + h_wedge };

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.fillStyle = isDark ? 'rgba(165, 180, 252, 0.3)' : 'rgba(79, 70, 229, 0.2)';
                ctx.fill();
                ctx.strokeStyle = isDark ? '#A5B4FC' : '#4F46E5';
                ctx.stroke();

                const r = Math.sqrt((p3.x-p1.x)**2 + (p3.y-p1.y)**2);
                const safeRadius = Math.abs(r * Math.cos(phiRad));

                const p5 = {x: p1.x - safeRadius * Math.cos(alpha2), y: p1.y + safeRadius * Math.sin(alpha2) };
                const p7 = {x: p2.x + safeRadius * Math.cos(alpha2), y: p2.y + safeRadius * Math.sin(alpha2) };
                
                if (safeRadius > 0) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.arc(p1.x, p1.y, safeRadius, Math.PI, Math.PI + alpha2, false);
                    ctx.lineTo(p3.x, p3.y);
                    ctx.closePath();
                    ctx.fillStyle = isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(167, 139, 250, 0.2)';
                    ctx.fill();
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(p2.x, p2.y);
                    ctx.arc(p2.x, p2.y, safeRadius, 0, -alpha2, true);
                    ctx.lineTo(p3.x, p3.y);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.moveTo(p1.x,p1.y);
                ctx.lineTo(p1.x - 50, p1.y);
                ctx.lineTo(p1.x - 50 - Math.abs(p5.y-p1.y), p5.y);
                ctx.lineTo(p5.x,p5.y);
                ctx.closePath();
                ctx.fillStyle = isDark ? 'rgba(240, 82, 82, 0.2)' : 'rgba(252, 165, 165, 0.2)';
                ctx.fill();
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(p2.x,p2.y);
                ctx.lineTo(p2.x + 50, p2.y);
                ctx.lineTo(p2.x + 50 + Math.abs(p7.y-p2.y), p7.y);
                ctx.lineTo(p7.x,p7.y);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            function getInputs(){ let c = parseFloat(cPrimeInput.value); let gamma = parseFloat(gammaValInput.value); let gamma_sat = parseFloat(gammaSatValInput.value); if(currentUnitSystem === 'ton') { c *= KPA_PER_TON; gamma *= KPA_PER_TON; gamma_sat *= KPA_PER_TON; } return{c,phi:parseFloat(phiDegInput.value),gamma,Df:parseFloat(DfValInput.value),B:parseFloat(BValInput.value),shape:foundationShapeSelect.value,FS:parseFloat(FSInput.value),useGWT:gwtCheckbox.checked,Dw:parseFloat(dwValInput.value),gamma_sat,hf:parseFloat(hfInput.value)/100,col_b:parseFloat(colBInput.value)/100,col_l:parseFloat(colLInput.value)/100,}}
            
            function performCalculationAndDraw(isDesignResult = false) {
                const params = getInputs();
                if (!isDesignResult) {
                    designResultTextDiv.classList.add('hidden');
                }
                assumptionWarningBox.classList.toggle('hidden', !(params.Df > params.B));
                if (params.Df > params.B) { assumptionWarningBox.textContent = `אזהרה: Df (${params.Df}) > B (${params.B}). היסוד אינו "רדוד" והתוצאות אינן מדויקות.`; }
                let {q_u, factors, intermediates} = terzaghiBearingCapacity(params);
                let qall = NaN, p_net_all = NaN, W_foundation = NaN, W_soil = NaN, A_foundation = NaN, P_gross_all = NaN;
                if (!isNaN(params.FS) && params.FS > 0 && !isNaN(q_u)) { qall = q_u / params.FS; }
                if (params.shape !== 'strip' && !isNaN(qall)) {
                    const { B, hf, col_b, col_l, Df, gamma } = params;
                    const gamma_c = 22.56;
                    A_foundation = (params.shape === 'square') ? B * B : Math.PI * (B/2)**2;
                    W_foundation = A_foundation * hf * gamma_c;
                    const A_column = (params.shape === 'circular') ? (Math.PI * (col_b/2)**2) : (col_b * col_l);
                    const soilHeightOverFoundation = Math.max(0, Df - hf);
                    W_soil = (A_foundation - A_column) * soilHeightOverFoundation * gamma;
                    P_gross_all = qall * A_foundation;
                    p_net_all = P_gross_all - W_foundation - W_soil;
                } else if (params.shape === 'strip' && !isNaN(qall)) {
                    p_net_all = qall * params.B;
                }
                lastCalculationResult = { ...params, qu: q_u, qall, p_net_all, factors, intermediates, W_foundation, W_soil, A_foundation, P_gross_all };
                animateResults(lastCalculationResult);
                resultsBox.classList.remove('hidden');
                drawAllCanvases();
                updateCostTabDimensions();
                updateBoq(getInputs());
                if (currentMode === 'analysis') updateGraph();
                if (document.getElementById('solution-tab').classList.contains('active')) {
                    populateSolutionTab(lastCalculationResult);
                }
            }
            function animateResults(data) { let { qu, qall, B, factors, shape, p_net_all } = data; const conversionFactor = currentUnitSystem === 'ton' ? 1/KPA_PER_TON : 1; const pressureUnit = currentUnitSystem === 'kpa' ? 'kPa' : 't/m²'; const loadUnit = currentUnitSystem === 'kpa' ? 'kN' : 't'; const lineLoadUnit = currentUnitSystem === 'kpa' ? 'kN/m' : 't/m'; document.querySelectorAll('.result-value').forEach(el => el.classList.remove('visible')); setTimeout(() => { quOutput.textContent = isNaN(qu) ? "-" : (qu * conversionFactor).toFixed(2) + ` ${pressureUnit}`; qallOutput.textContent = isNaN(qall) ? "-" : (qall * conversionFactor).toFixed(2) + ` ${pressureUnit}`; factorsOutput.textContent = (factors && !isNaN(factors.Nc)) ? `Nc=${factors.Nc.toFixed(2)}, Nq=${factors.Nq.toFixed(2)}, Nγ=${factors.N_gamma.toFixed(2)}` : "שגיאה"; stripLoadResultDiv.classList.toggle('hidden', shape !== 'strip'); netLoadResultDiv.classList.toggle('hidden', shape === 'strip'); if (shape === 'strip') { stripQallOutput.textContent = isNaN(p_net_all) ? "-" : (p_net_all * conversionFactor).toFixed(2) + ` ${lineLoadUnit}`; } else { pNetOutput.textContent = isNaN(p_net_all) ? "-" : (p_net_all * conversionFactor).toFixed(2) + ` ${loadUnit}`; } setTimeout(() => { document.querySelectorAll('.result-value').forEach(el => el.classList.add('visible')); }, 50); }, 10); }
            function handleShapeChange() { const shape = foundationShapeSelect.value; const tooltips = { strip: { label: "עובי קיר (t<sub>w</sub>) [cm]", text: "עובי הקיר הנתמך." }, circular: { label: "קוטר עמוד (d<sub>col</sub>) [cm]", text: "קוטר העמוד העגול." }, square: { label: "רוחב עמוד (b<sub>col</sub>) [cm]", text: "רוחב חתך העמוד." } }; colLDiv.classList.toggle('hidden', shape === 'strip' || shape === 'circular'); colBLabel.innerHTML = `<span class="tooltip learn-tooltip"><svg class="tooltip-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg><span class="tooltiptext">${tooltips[shape].text}</span></span><span>${tooltips[shape].label}</span>`; drawAllCanvases(); updateCostTabDimensions(); }
            function updateGraph() {
                graphContainer.classList.remove('hidden');
                const currentParams = getInputs();
                const labels = [];
                const data = [];
                const conversionFactor = currentUnitSystem === 'ton' ? 1/KPA_PER_TON : 1;
                const pressureUnit = currentUnitSystem === 'kpa' ? 'kPa' : 't/m²';
                for (let b = 0.5; b <= 5; b += 0.25) {
                    labels.push(b.toFixed(2));
                    let paramsForGraph = { ...currentParams, B: b };
                    let { q_u } = terzaghiBearingCapacity(paramsForGraph);
                    let q_all = isNaN(q_u) || currentParams.FS <= 0 ? 0 : q_u / currentParams.FS;
                    data.push(q_all * conversionFactor);
                }
                const isDark = document.documentElement.classList.contains('dark');
                const chartConfig = {
                    type: 'line',
                    data: { labels, datasets: [{ label: `תסבולת מותרת (${pressureUnit})`, data, borderColor: '#4F46E5', backgroundColor: 'rgba(79, 70, 229, 0.1)', fill: true, tension: 0.1 }] },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        interaction: { mode: 'index', intersect: false },
                        plugins: {
                            tooltip: {
                                enabled: true,
                                titleFont: { family: 'Assistant' },
                                bodyFont: { family: 'Assistant' },
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) { label += ': '; }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y.toFixed(2) + ` ${pressureUnit}`;
                                        }
                                        return label;
                                    }
                                }
                            },
                            legend: { labels: { color: isDark ? '#E5E7EB' : '#1F2937', font: { family: 'Assistant' } } }
                        },
                        scales: {
                            x: { title: { display: true, text: `רוחב יסוד B (m)`, color: isDark ? '#9CA3AF' : '#4B5563', font: { family: 'Assistant', size: 14 } }, ticks: { color: isDark ? '#9CA3AF' : '#4B5563' }, grid: { color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' } },
                            y: { title: { display: true, text: `תסבולת מותרת q_all (${pressureUnit})`, color: isDark ? '#9CA3AF' : '#4B5563', font: { family: 'Assistant', size: 14 } }, ticks: { color: isDark ? '#9CA3AF' : '#4B5563' }, grid: { color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' } }
                        }
                    }
                };
                if (bearingChart) {
                    bearingChart.options = chartConfig.options;
                    bearingChart.data = chartConfig.data;
                    bearingChart.update();
                } else {
                    bearingChart = new Chart(bearingCapacityChartCanvas, chartConfig);
                }
            }
            function populateSolutionTab(data) {
                if (!data || Object.keys(data).length === 0 || isNaN(data.qu)) {
                    solutionContainer.innerHTML = `<div class="text-center p-8 text-gray-500"><p>בצע חישוב להצגת מהלך הפתרון.</p></div>`;
                    return;
                }
                const { c, phi, gamma, FS, qu, qall, p_net_all, factors, intermediates, useGWT, gamma_sat, shape, hf, A_foundation, W_foundation, W_soil, Df, B, Dw, P_gross_all } = data;
                const cf = currentUnitSystem === 'ton' ? 1/KPA_PER_TON : 1;
                const pUnit = currentUnitSystem === 'kpa' ? 'kPa' : 't/m²';
                const dUnit = currentUnitSystem === 'kpa' ? 'kN/m³' : 't/m³';
                const lUnit = currentUnitSystem === 'kpa' ? 'kN' : 't';
                const llUnit = currentUnitSystem === 'kpa' ? 'kN/m' : 't/m';
                
                const legendHtml = (formulaVars) => {
                    const varMap = {
                        "qᵤ": "תסבולת הרס אולטימטיבית", "c'": "קוהזיה אפקטיבית", "N<sub>c</sub>, N<sub>q</sub>, N<sub>γ</sub>": "מקדמי תסבולת", "s<sub>c</sub>, s<sub>γ</sub>": "מקדמי צורה",
                        "q'": "מאמץ אפקטיבי בעומק הביסוס", "γ'": "משקל מרחבי אפקטיבי של הקרקע", "B": "רוחב היסוד", "qₐₗₗ": "תסבולת מותרת", "FS": "מקדם בטיחות"
                    };
                    let html = `<details class="legend-details"><summary>מקרא</summary><ul class="legend-content list-disc pr-4 space-y-1">`;
                    formulaVars.forEach(v => html += `<li><span dir="ltr">${v}</span>: ${varMap[v]}</li>`);
                    html += `</ul></details>`;
                    return html;
                };

                let html = ``;
                html += `<div class="solution-step"><h3 class="solution-step-title">שלב 1: נתוני הבעיה</h3><p>c' = ${(c*cf).toFixed(2)} ${pUnit}, φ' = ${phi}°</p><p>γ = ${(gamma*cf).toFixed(2)} ${dUnit}, Df = ${Df} m, B = ${B} m</p><p>צורת יסוד: ${shape}, FS = ${FS}</p>`;
                if (useGWT) { html += `<p>מי תהום: כן, Dw = ${Dw} m, γ<sub>sat</sub> = ${(gamma_sat*cf).toFixed(2)} ${dUnit}</p>`; }
                html += `</div>`;

                html += `<div class="solution-step"><h3 class="solution-step-title">שלב 2: חישוב מקדמי תסבולת</h3>`;
                if (factors.interpolated) { html += `<p>עבור φ' = ${phi}°, נבצע אינטרפולציה לינארית:</p><div class="step-result">N<sub>c</sub> = ${factors.Nc.toFixed(2)}, N<sub>q</sub> = ${factors.Nq.toFixed(2)}, N<sub>γ</sub> = ${factors.N_gamma.toFixed(2)}</div>`; } 
                else { html += `<p>עבור φ' = ${phi}°, המקדמים מטבלת טרצגי הם:</p><div class="step-result">N<sub>c</sub> = ${factors.Nc.toFixed(2)}, N<sub>q</sub> = ${factors.Nq.toFixed(2)}, N<sub>γ</sub> = ${factors.N_gamma.toFixed(2)}</div>`; }
                html += `</div>`;
                
                html += `<div class="solution-step"><h3 class="solution-step-title">שלב 3: חישוב תסבולת הרס (qᵤ)</h3><p>נציב בנוסחת טרצגי:</p>
                        <div class="formula-box"><code class="formula">qᵤ = c'·N<sub>c</sub>·s<sub>c</sub> + q'·N<sub>q</sub>·s<sub>q</sub> + 0.5·γ'·B·N<sub>γ</sub>·s<sub>γ</sub></code></div>
                        ${legendHtml(["qᵤ", "c'", "N<sub>c</sub>, N<sub>q</sub>, N<sub>γ</sub>", "s<sub>c</sub>, s<sub>γ</sub>", "q'", "γ'", "B"])}
                        <p class="mt-4"><b>הצבת הנתונים בחישוב (ביחידות kPa):</b></p>
                        <div class="formula-box"><code class="formula">qᵤ = (${c.toFixed(2)}·${factors.Nc.toFixed(2)}·${intermediates.s_c}) + (${intermediates.q_eff.toFixed(2)}·${factors.Nq.toFixed(2)}·${intermediates.s_q}) + (0.5·${intermediates.gamma_eff.toFixed(2)}·${B}·${factors.N_gamma.toFixed(2)}·${intermediates.s_gamma})</code></div>
                        <div class="step-result">qᵤ = ${(qu*cf).toFixed(2)} ${pUnit}</div></div>`;

                html += `<div class="solution-step"><h3 class="solution-step-title">שלב 4: חישוב תסבולת ועומס מותרים</h3>
                        <p>תחילה, נחשב את תסבולת הקרקע המותרת:</p>
                        <div class="formula-box"><code class="formula">qₐₗₗ = qᵤ / FS</code></div>
                        ${legendHtml(["qₐₗₗ", "qᵤ", "FS"])}
                        <p class="mt-4"><b>הצבת ערכים:</b></p>
                        <div class="formula-box"><code class="formula">qₐₗₗ = ${(qu*cf).toFixed(2)} / ${FS} = ${(qall*cf).toFixed(2)} ${pUnit}</code></div>`;
                if (shape === 'strip') {
                    html += `<p class="mt-4">עבור יסוד נמשך, העומס המותר למטר אורך הוא:</p><div class="formula-box"><code class="formula">Qₐₗₗ = qₐₗₗ * B = ${(qall*cf).toFixed(2)} * ${B} = ${(p_net_all*cf).toFixed(2)} ${llUnit}</code></div>`;
                } else {
                    html += `<p class="mt-4">כעת, נחשב את העומס הנקי המותר על האלמנט:</p>
                             <div class="formula-box"><code class="formula">P<sub>net,all</sub> = qₐₗₗ · A - W<sub>foundation</sub> - W<sub>soil</sub></code></div>
                             <div class="step-result">P<sub>net,all</sub> = ${(p_net_all*cf).toFixed(2)} ${lUnit}</div>`;
                }
                html += `</div>`;
                solutionContainer.innerHTML = html;
            }
            function updateCostTabDimensions() { const shape = foundationShapeSelect.value; const B = parseFloat(BValInput.value) || 0; const hf_cm = parseFloat(hfInput.value) || 0; const displayDiv = document.getElementById('foundation-dimensions-display'); const stripInputContainer = document.getElementById('strip-length-input-container'); let displayText = ''; if (shape === 'square') { displayText = `יסוד ריבועי, מידות: ${B}x${B} מ', עובי: ${hf_cm} ס"מ`; stripInputContainer.classList.add('hidden'); } else if (shape === 'circular') { displayText = `יסוד עגול, קוטר: ${B} מ', עובי: ${hf_cm} ס"מ`; stripInputContainer.classList.add('hidden'); } else if (shape === 'strip') { displayText = `יסוד נמשך, רוחב: ${B} מ', עובי: ${hf_cm} ס"מ`; stripInputContainer.classList.remove('hidden'); } displayDiv.textContent = displayText; }
            function updateBoq(params) { const { Df, B, shape, hf } = params; if (isNaN(Df) || isNaN(B) || isNaN(hf) || B <= 0 || Df < 0 || hf < 0) { currentBoq = []; return; } const stripLength = (shape === 'strip') ? (parseFloat(stripLengthInput.value) || 1.0) : 1.0; let excavationVol = 0, concreteVol = 0, formworkArea = 0; if (shape === 'square') { const area = B * B; excavationVol = area * Df; concreteVol = area * hf; formworkArea = 4 * B * hf; } else if (shape === 'circular') { const area = Math.PI * (B / 2) ** 2; excavationVol = area * Df; concreteVol = area * hf; formworkArea = Math.PI * B * hf; } else if (shape === 'strip') { excavationVol = B * Df * stripLength; concreteVol = B * hf * stripLength; formworkArea = 2 * stripLength * hf; } const steelMethod = document.querySelector('input[name="steel-calc-method"]:checked').value; const steelQty = (steelMethod === 'ratio') ? (concreteVol * (parseFloat(steelRatioInput.value) || 0)) / 1000 : parseFloat(steelTotalWeightInput.value) || 0; currentBoq = [ { name: 'חפירה ועבודות עפר', qty: excavationVol, unit: 'מ"ק', price: parseFloat(boqExcavationPrice.value) || 0, type: 'material' }, { name: 'בטון', qty: concreteVol, unit: 'מ"ק', price: parseFloat(boqConcretePrice.value) || 0, type: 'material' }, { name: 'טפסנות', qty: formworkArea, unit: 'מ"ר', price: parseFloat(boqFormworkPrice.value) || 0, type: 'material' }, { name: 'פלדה (ברזל)', qty: steelQty, unit: 'טון', price: parseFloat(boqSteelPrice.value) || 0, type: 'material' }, ]; updateCostEstimationTab(); }
            function updateCostEstimationTab() { if (!currentBoq.length) return; const getBoqValue = (name, key) => currentBoq.find(item => item.name.includes(name))?.[key]; boqExcavationQty.textContent = getBoqValue('חפירה', 'qty')?.toFixed(2) ?? '-'; boqConcreteQty.textContent = getBoqValue('בטון', 'qty')?.toFixed(2) ?? '-'; boqFormworkQty.textContent = getBoqValue('טפסנות', 'qty')?.toFixed(2) ?? '-'; boqSteelQty.textContent = getBoqValue('פלדה', 'qty')?.toFixed(3) ?? '-'; const formatCurrency = val => val.toLocaleString('he-IL', { maximumFractionDigits: 0 }); boqExcavationTotal.textContent = formatCurrency((getBoqValue('חפירה', 'qty') || 0) * (getBoqValue('חפירה', 'price') || 0)); boqConcreteTotal.textContent = formatCurrency((getBoqValue('בטון', 'qty') || 0) * (getBoqValue('בטון', 'price') || 0)); boqFormworkTotal.textContent = formatCurrency((getBoqValue('טפסנות', 'qty') || 0) * (getBoqValue('טפסנות', 'price') || 0)); boqSteelTotal.textContent = formatCurrency((getBoqValue('פלדה', 'qty') || 0) * (getBoqValue('פלדה', 'price') || 0)); }
            
            function updateAllTabs() { renderFinalAccount(); renderQuantitiesSummary(); calculateFinalTotals(); }
            function renderFinalAccount() {
                finalAccountTableBody.innerHTML = '';
                if (finalAccountGroups.length === 0) {
                    finalAccountTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-gray-500 p-4">החשבון ריק. הוסף פריטים מלשונית אומדן עלות.</td></tr>`;
                    return;
                }
                finalAccountGroups.forEach((group) => {
                    const groupTotal = group.unitCost * group.groupQuantity;
                    const isFoundation = group.type === 'foundation';
                    let headerRow = document.createElement('tr');
                    headerRow.className = 'group-header-row';
                    headerRow.dataset.groupId = group.id;

                    let fullDescription = '';
                     if (isFoundation) {
                        const fullIndex = group.index + (group.version > 1 ? String.fromCharCode(1487 + group.version) : '');
                        fullDescription = `${group.name} ${fullIndex} ${group.versionName} <span class="text-sm font-normal text-gray-500 dark:text-gray-400">${group.descriptionDetails || ''}</span>`;
                    } else {
                        fullDescription = group.name;
                    }

                    headerRow.innerHTML = `
                        <td class="text-right font-bold flex items-center gap-2">${isFoundation ? `<svg class="arrow-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>` : ''}<div>${fullDescription}</div></td>
                        <td><div class="qty-controls"><button class="qty-btn" data-action="decrease" data-id="${group.id}">-</button><span class="font-bold text-lg mx-2">${group.groupQuantity}</span><button class="qty-btn" data-action="increase" data-id="${group.id}">+</button></div></td>
                        <td>${group.unit}</td>
                        <td>${group.unitCost.toLocaleString('he-IL', {style: 'currency', currency: 'ILS', minimumFractionDigits: 2})}</td>
                        <td>${groupTotal.toLocaleString('he-IL', {style: 'currency', currency: 'ILS'})}</td>
                        <td><button class="qty-btn delete-btn" data-action="delete" data-id="${group.id}">X</button></td>
                    `;
                    finalAccountTableBody.appendChild(headerRow);

                    if (isFoundation && group.components) {
                        group.components.forEach(comp => {
                            if (comp.qty > 0) {
                                let compRow = document.createElement('tr');
                                compRow.className = 'component-row';
                                compRow.dataset.parentGroupId = group.id;
                                const totalQty = comp.qty * group.groupQuantity;
                                const totalCost = totalQty * comp.price;
                                compRow.innerHTML = `
                                    <td class="component-name">${comp.name}</td>
                                    <td>${totalQty.toFixed(3)}</td>
                                    <td>${comp.unit}</td>
                                    <td>${comp.price.toLocaleString('he-IL')} ₪</td>
                                    <td>${totalCost.toLocaleString('he-IL')} ₪</td>
                                    <td></td>
                                `;
                                finalAccountTableBody.appendChild(compRow);
                            }
                        });
                    }
                });
            }
            
            function renderQuantitiesSummary() { const materialSummary = {}; const otherSummary = []; finalAccountGroups.forEach(group => { if (group.type === 'foundation' && group.components) { group.components.forEach(comp => { if (!materialSummary[comp.name]) { materialSummary[comp.name] = { total: 0, unit: comp.unit }; } materialSummary[comp.name].total += comp.qty * group.groupQuantity; }); } else if (group.type === 'other') { otherSummary.push({ description: group.name, quantity: group.groupQuantity, unit: group.unit }); } }); quantitiesMaterialsBody.innerHTML = ''; if(Object.keys(materialSummary).length === 0 || Object.values(materialSummary).every(m => m.total === 0)) { quantitiesMaterialsBody.innerHTML = `<tr><td colspan="3" class="text-center text-gray-500 p-4">אין כמויות חומרים.</td></tr>`; } else { Object.entries(materialSummary).forEach(([name, data]) => { if (data.total > 0) { const row = `<tr><td class="text-right">${name}</td><td>${data.total.toFixed(2)}</td><td>${data.unit}</td></tr>`; quantitiesMaterialsBody.innerHTML += row; } }); } quantitiesOthersBody.innerHTML = ''; if (otherSummary.length === 0) { quantitiesOthersBody.innerHTML = `<tr><td colspan="3" class="text-center text-gray-500 p-4">אין סעיפים אחרים.</td></tr>`; } else { otherSummary.forEach(item => { const row = `<tr><td class="text-right">${item.description}</td><td>${item.quantity.toFixed(2)}</td><td>${item.unit}</td></tr>`; quantitiesOthersBody.innerHTML += row; }); } }
            function calculateFinalTotals() { const directCost = finalAccountGroups.reduce((sum, group) => { return sum + (group.unitCost * group.groupQuantity); }, 0); const unforeseenPercent = parseFloat(unforeseenPercentInput.value) || 0; const retentionPercent = parseFloat(retentionPercentInput.value) || 0; const vatPercent = parseFloat(vatPercentInput.value) || 0; const unforeseenValue = directCost * (unforeseenPercent / 100); const subtotal = directCost + unforeseenValue; const retentionValue = subtotal * (retentionPercent / 100); const vatValue = (subtotal - retentionValue) * (vatPercent / 100); const finalTotal = subtotal - retentionValue + vatValue; const formatCurrency = (val) => val.toLocaleString('he-IL', { style: 'currency', currency: 'ILS' }); summaryDirectCost.textContent = formatCurrency(directCost); summaryUnforeseenValue.textContent = formatCurrency(unforeseenValue); summarySubtotal.textContent = formatCurrency(subtotal); summaryRetentionValue.textContent = `(${formatCurrency(retentionValue)})`; summaryVatValue.textContent = formatCurrency(vatValue); summaryFinalTotal.textContent = formatCurrency(finalTotal); }

            // --- EVENT LISTENERS ---
            calculateButton.addEventListener('click', () => { if(currentMode === 'analysis') { performCalculationAndDraw(); } else { performDesignCalculation(); } });
            gwtCheckbox.addEventListener('change', () => { gwtInputsDiv.classList.toggle('hidden', !gwtCheckbox.checked); drawAllCanvases(); });
            [DfValInput, BValInput, cPrimeInput, phiDegInput, gammaValInput, dwValInput, gammaSatValInput, hfInput, colBInput, colLInput, FSInput, foundationShapeSelect].forEach(i => i.addEventListener('input', () => { drawAllCanvases(); updateCostTabDimensions(); }));
            [boqExcavationPrice, boqConcretePrice, boqFormworkPrice, boqSteelPrice, steelRatioInput, steelTotalWeightInput, stripLengthInput].forEach(input => input.addEventListener('input', () => updateBoq(getInputs())));
            steelCalcMethodRadios.forEach(radio => radio.addEventListener('change', () => { const isRatio = radio.value === 'ratio'; steelRatioInputs.classList.toggle('hidden', !isRatio); steelTotalInputs.classList.toggle('hidden', isRatio); updateBoq(getInputs()); }));
            
            addToAccountButton.addEventListener('click', () => {
                const name = foundationNameInput.value.trim();
                const index = foundationIndexInput.value.trim();
                if (!name || !index || !currentBoq.length) { alert("אנא בצע חישוב הנדסי תחילה"); return; }
                const shape = foundationShapeSelect.value;
                const B = parseFloat(BValInput.value) || 0;
                const hf = parseFloat(hfInput.value) / 100 || 0;
                const stripLength = (shape === 'strip') ? (parseFloat(document.getElementById('strip-foundation-length').value) || 1.0) : 1.0;
                let descriptionDetails = '';
                if (shape === 'square') { descriptionDetails = `(${B.toFixed(2)}x${B.toFixed(2)} מ', עובי ${hf.toFixed(2)} מ')`; }
                else if (shape === 'circular') { descriptionDetails = `(קוטר ${B.toFixed(2)} מ', עובי ${hf.toFixed(2)} מ')`; }
                else if (shape === 'strip') { descriptionDetails = `(רוחב ${B.toFixed(2)} מ', אורך ${stripLength.toFixed(2)} מ', עובי ${hf.toFixed(2)} מ')`; }
                const unitCost = currentBoq.reduce((sum, item) => sum + (item.qty * item.price), 0);
                const existingGroupIndex = finalAccountGroups.findIndex(g => g.type === 'foundation' && g.name === name && g.index === index && Math.abs(g.unitCost - unitCost) < 0.01);
                if (existingGroupIndex > -1) { finalAccountGroups[existingGroupIndex].groupQuantity++; }
                else {
                    const sameIndexGroups = finalAccountGroups.filter(g => g.type === 'foundation' && g.name === name && g.index === index);
                    let newVersion = 1, versionName = '';
                    if (sameIndexGroups.length > 0) { newVersion = Math.max(...sameIndexGroups.map(g => g.version)) + 1; versionName = `גרסא ${String.fromCharCode(96 + newVersion)}`; }
                    const newGroup = { id: `${name}_${index}_${Date.now()}`, type: 'foundation', name, index, version: newVersion, versionName, groupQuantity: 1, unitCost, descriptionDetails, components: JSON.parse(JSON.stringify(currentBoq)) };
                    finalAccountGroups.push(newGroup);
                }
                saveAccountToStorage();
                updateAllTabs();
            });

            addCustomItemButton.addEventListener('click', () => {
                const desc = customItemDesc.value.trim();
                const qty = parseFloat(customItemQty.value);
                const unit = customItemUnit.value.trim();
                const price = parseFloat(customItemPrice.value);
                if (!desc || isNaN(qty) || !unit || isNaN(price) || qty <= 0 || price < 0) { alert("אנא מלא את כל השדות."); return;}
                const customItem = { id: `custom_${Date.now()}`, type: 'other', name: desc, groupQuantity: qty, unit: unit, unitCost: price };
                finalAccountGroups.push(customItem);
                saveAccountToStorage();
                updateAllTabs();
                customItemDesc.value = ''; customItemQty.value = '1'; customItemUnit.value = 'קומפלט'; customItemPrice.value = '';
            });

            finalAccountTableBody.addEventListener('click', (e) => {
                const headerRow = e.target.closest('.group-header-row');
                if (headerRow) {
                    const groupId = headerRow.dataset.groupId;
                    const componentRows = finalAccountTableBody.querySelectorAll(`.component-row[data-parent-group-id="${groupId}"]`);
                    headerRow.classList.toggle('open');
                    const isOpen = headerRow.classList.contains('open');
                    componentRows.forEach(row => row.style.display = isOpen ? 'table-row' : 'none');
                }

                const button = e.target.closest('.qty-btn');
                if (!button) return;
                const action = button.dataset.action;
                const id = button.dataset.id;
                const groupIndex = finalAccountGroups.findIndex(g => g.id === id);
                if (groupIndex === -1) return;

                switch(action) {
                    case 'increase': finalAccountGroups[groupIndex].groupQuantity++; break;
                    case 'decrease': finalAccountGroups[groupIndex].groupQuantity = Math.max(0, finalAccountGroups[groupIndex].groupQuantity - 1); if (finalAccountGroups[groupIndex].groupQuantity === 0) finalAccountGroups.splice(groupIndex, 1); break;
                    case 'delete': finalAccountGroups.splice(groupIndex, 1); break;
                }
                saveAccountToStorage();
                updateAllTabs();
            });
            
            clearAccountButton.addEventListener('click', () => {
                showConfirmationModal('האם אתה בטוח שברצונך למחוק את כל החשבון?', (confirmed) => {
                    if (confirmed) {
                        finalAccountGroups = [];
                        saveAccountToStorage();
                        updateAllTabs();
                    }
                });
            });

            [unforeseenPercentInput, retentionPercentInput, vatPercentInput].forEach(input => input.addEventListener('input', calculateFinalTotals));

            // --- EXPORT LOGIC ---
            exportPdfBtn.addEventListener('click', async () => {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                const isDark = document.documentElement.classList.contains('dark');

                doc.setR2L(true);
                
                let yPos = 20;

                const addSection = async (title, elementId) => {
                    const isDarkTheme = document.documentElement.classList.contains('dark');
                    if (yPos > 260) {
                         doc.addPage();
                         yPos = 20;
                    }
                    doc.setFontSize(16);
                    doc.text(title, 190, yPos, { align: 'right' });
                    yPos += 10;
                    
                    const element = document.getElementById(elementId);
                    if (element) {
                        const canvas = await html2canvas(element, { 
                            backgroundColor: isDarkTheme ? '#1F2937' : '#FFFFFF',
                            scale: 2 
                        });
                        const imgData = canvas.toDataURL('image/png');
                        const imgProps = doc.getImageProperties(imgData);
                        const pdfWidth = doc.internal.pageSize.getWidth() - 20;
                        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                        if (yPos + pdfHeight > 280) {
                             doc.addPage();
                             yPos = 20;
                        }
                        doc.addImage(imgData, 'PNG', 10, yPos, pdfWidth, pdfHeight);
                        yPos += pdfHeight + 10;
                    }
                }
                
                doc.setFontSize(22);
                doc.text("דוח חישובים ועלויות", 105, 15, { align: 'center'});

                await addSection("נתוני קלט", "calculation-tab"); 
                if(!resultsBox.classList.contains('hidden')) await addSection("תוצאות החישוב", "resultsBox");
                if(!solutionContainer.querySelector('.text-center')) await addSection("מהלך הפתרון", "solution-steps-container");
                if(finalAccountGroups.length > 0) {
                     if (yPos > 260) { doc.addPage(); yPos = 20; }
                     doc.setFontSize(16);
                     doc.text("חשבון סופי", 190, yPos, { align: 'right' });
                     yPos += 10;
                     doc.autoTable({ html: '#final-account-table', startY: yPos, theme: 'grid' });
                }

                doc.save(`Tertzagi_Report_${new Date().toISOString().slice(0,10)}.pdf`);
            });

            exportXlsBtn.addEventListener('click', () => {
                const wb = XLSX.utils.book_new();
                const accountData = [["תיאור הסעיף", "כמות", "יחידה", "מחיר יחידה (₪)", "סה\"כ (₪)"]];
                finalAccountGroups.forEach(group => {
                    const total = group.unitCost * group.groupQuantity;
                     if (group.type === 'foundation') {
                        const fullIndex = group.index + (group.version > 1 ? String.fromCharCode(96 + group.version) : '');
                        const fullName = `${group.name} ${fullIndex} ${group.versionName} ${group.descriptionDetails || ''}`;
                        accountData.push([fullName, group.groupQuantity, 'יח\'', group.unitCost, total]);
                        group.components.forEach(comp => {
                           accountData.push([`  - ${comp.name}`, comp.qty * group.groupQuantity, comp.unit, comp.price, comp.qty * group.groupQuantity * comp.price]);
                        });
                    } else {
                         accountData.push([group.name, group.groupQuantity, group.unit, group.unitCost, total]);
                    }
                });
                const accountWs = XLSX.utils.aoa_to_sheet(accountData);
                XLSX.utils.book_append_sheet(wb, accountWs, "חשבון סופי");
                const quantitiesWs = XLSX.utils.aoa_to_sheet([["חומר", "כמות", "יחידה"]]);
                XLSX.utils.book_append_sheet(wb, quantitiesWs, "סיכום כמויות");
                XLSX.writeFile(wb, "ProjectReport.xlsx");
            });
            
            // --- INITIALIZATION ---
            loadAccountFromStorage();
            const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            applyTheme(savedTheme);
            const savedUnitSystem = localStorage.getItem('unitSystem') || 'kpa';
            applyUnitSystem(savedUnitSystem);
            handleShapeChange();
            performCalculationAndDraw();
            updateAllTabs();
        });