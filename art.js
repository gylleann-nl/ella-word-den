/* Ella's Word Den: hand-drawn pictures.
   Every picture is drawn on a 100 x 100 grid with a thick purple outline and pastel colours.
   art("apple") returns an <svg>. Add new pictures to ART below. */
(function(){
const K="#3A2456";
const COL={red:"#FF6B6B",dred:"#E03131",pink:"#FF9EC4",lpink:"#FFC9DE",orange:"#FFA94D",yellow:"#FFD43B",lyellow:"#FFE066",cream:"#FFF4E6",
  green:"#69DB7C",dgreen:"#37B24D",lime:"#A9E34B",blue:"#74C0FC",dblue:"#4DABF7",navy:"#4C6EF5",purple:"#B197FC",lpurple:"#D0BFFF",
  brown:"#C08457",dbrown:"#8D5A3B",tan:"#E8B06A",grey:"#ADB5BD",lgrey:"#DEE2E6",dgrey:"#495057",skin:"#FFD8B5",white:"#FFFFFF",gold:"#FAB005"};
const c=COL;
const C=(x,y,r,f=c.white,a="")=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${a}/>`;
const E=(x,y,rx,ry,f=c.white,a="")=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${a}/>`;
const R=(x,y,w,h,r,f=c.white,a="")=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" ${a}/>`;
const P=(d,f="none",a="")=>`<path d="${d}" fill="${f}" ${a}/>`;
const S=(d,col,w=3)=>`<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}"/>`;
const T=(x,y,s,t,f=K)=>`<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle" fill="${f}" stroke="none" font-family="Fredoka,Nunito,sans-serif" font-weight="700">${t}</text>`;
const G=(tr,inner)=>`<g transform="${tr}">${inner}</g>`;
const NS='stroke="none"';
const dot=(x,y,r=2.8)=>C(x,y,r,K,NS);
const blush=(x,y)=>E(x,y,4.5,2.8,c.pink,NS+' opacity=".85"');
const smile=(x,y,w=4)=>P(`M${x-w} ${y} Q${x} ${y+w} ${x+w} ${y}`);
const face=(x,y,g=8)=>dot(x-g,y)+dot(x+g,y)+smile(x,y+5,4)+blush(x-g-5,y+5)+blush(x+g+5,y+5);
const happyEyes=(x,y,g=8)=>P(`M${x-g-4} ${y} Q${x-g} ${y-5} ${x-g+4} ${y} M${x+g-4} ${y} Q${x+g} ${y-5} ${x+g+4} ${y}`);
function starPts(cx,cy,R1,r1,n=5){let d="";for(let i=0;i<n*2;i++){const a=Math.PI/n*i-Math.PI/2,rr=i%2?r1:R1;d+=(i?"L":"M")+(cx+rr*Math.cos(a)).toFixed(1)+" "+(cy+rr*Math.sin(a)).toFixed(1)}return d+"Z"}
const heartPath=(x,y,s)=>`M${x} ${y+s*.9} C${x-s*1.4} ${y} ${x-s*.9} ${y-s*.9} ${x} ${y-s*.35} C${x+s*.9} ${y-s*.9} ${x+s*1.4} ${y} ${x} ${y+s*.9}Z`;

/* People share one body so the family looks like a family. */
function person(o={}){
  const hc=o.hc||c.dbrown,sk=o.skin||c.skin;let s="";
  if(o.hair==="long")s+=P("M24 82 C14 40 30 22 50 22 C70 22 86 40 76 82Z",hc);
  if(o.hair==="pigtails")s+=C(24,44,9,hc)+C(76,44,9,hc)+C(18,36,4,c.pink)+C(82,36,4,c.pink);
  if(o.hair==="bun")s+=C(50,22,9,hc);
  s+=P("M20 100 Q20 74 50 74 Q80 74 80 100Z",o.shirt||c.blue);
  if(o.coat)s+=P("M50 76 L50 100",c.white)+R(56,84,10,10,2,c.white)+P("M61 86 L61 92 M58 89 L64 89","none",`stroke="${c.dred}"`);
  s+=C(50,48,22,sk);
  if(o.hair==="short"||o.hair==="long"||o.hair==="bun"||o.hair==="pigtails")s+=P("M28 46 C28 24 72 24 72 46 Q62 34 50 38 Q38 34 28 46Z",hc);
  if(o.hair==="bald")s+=P("M28 50 Q26 38 32 34 M72 50 Q74 38 68 34","none",`stroke="${hc}" stroke-width="5"`);
  if(o.hair==="curl")s+=P("M50 27 Q44 20 50 16 Q56 14 56 20","none");
  if(o.beard)s+=P("M30 52 Q32 74 50 74 Q68 74 70 52 Q64 62 50 62 Q36 62 30 52Z",hc);
  if(o.mous)s+=P("M40 60 Q45 55 50 58 Q55 55 60 60 Q55 62 50 60 Q45 62 40 60Z",hc);
  s+=dot(42,48)+dot(58,48);
  if(!o.beard&&!o.mous&&!o.paci)s+=smile(50,56,4);
  s+=blush(36,55)+blush(64,55);
  if(o.glasses)s+=C(42,48,6.5,"none")+C(58,48,6.5,"none")+P("M48.5 48 L51.5 48");
  if(o.paci)s+=C(50,60,5,c.blue)+C(50,60,2,c.white,NS);
  if(o.earrings)s+=C(28,58,2.5,c.gold)+C(72,58,2.5,c.gold);
  if(o.crown)s+=P("M32 30 L34 12 L42 22 L50 10 L58 22 L66 12 L68 30Z",c.yellow)+C(50,24,2.5,c.red,NS);
  if(o.cap)s+=P("M28 40 Q30 22 50 22 Q70 22 72 40Z",o.cap)+P("M70 40 L86 42 Q86 36 72 36",o.cap);
  if(o.steth)s+=P("M36 76 Q36 90 50 90 Q64 90 64 76","none",`stroke="${c.dgrey}"`)+C(50,92,3,c.grey);
  return s}
const kidPair=()=>G("translate(-6 10) scale(.62)",person({hair:"pigtails",shirt:c.purple}))+G("translate(42 10) scale(.62)",person({hair:"short",shirt:c.green,hc:K})); 

const ART={
/* ---------- Fruit ---------- */
apple:()=>P("M50 30 C30 18 12 34 16 56 C20 80 38 90 50 84 C62 90 80 80 84 56 C88 34 70 18 50 30Z",c.red)+P("M50 30 Q50 18 56 12")+P("M53 22 Q64 10 76 15 Q66 27 53 22Z",c.green)+face(50,56),
banana:()=>P("M18 26 Q18 78 70 84 Q86 86 86 76 Q46 70 32 26 Q28 18 18 26Z",c.lyellow)+P("M18 26 L14 20")+face(52,64,6),
orange:()=>C(50,56,32,c.orange)+P("M50 24 Q60 10 72 17 Q62 28 50 24Z",c.green)+P("M50 24 L50 18")+face(50,58),
grapes:()=>P("M50 26 L50 12")+P("M51 16 Q64 6 74 14 Q64 22 51 16Z",c.green)+[[36,36],[52,34],[68,36],[44,52],[60,52],[52,68]].map(([x,y])=>C(x,y,10,c.purple)).join("")+dot(46,52,2)+dot(58,52,2)+smile(52,57,3),
strawberry:()=>P("M50 88 C22 70 12 44 26 32 C36 24 64 24 74 32 C88 44 78 70 50 88Z",c.red)+P("M28 32 L38 20 L50 28 L62 20 L72 32 Q50 40 28 32Z",c.green)+[[38,48],[62,48],[44,64],[56,64],[50,76],[50,44]].map(([x,y])=>E(x,y,1.6,2.4,c.lyellow,NS)).join(""),
watermelon:()=>P("M8 36 A42 42 0 0 0 92 36 Z",c.dgreen)+P("M15 38 A35 35 0 0 0 85 38 Z",c.red)+[[34,50],[50,56],[66,50],[42,64],[58,64]].map(([x,y])=>E(x,y,2,3.2,K,NS)).join(""),
pear:()=>P("M50 22 C42 22 40 36 36 46 C24 58 26 88 50 88 C74 88 76 58 64 46 C60 36 58 22 50 22Z",c.lime)+P("M50 22 L52 11")+P("M52 16 Q62 8 70 14 Q62 21 52 16Z",c.green)+face(50,64),
peach:()=>P("M50 32 C34 18 12 32 16 56 C20 80 40 88 50 88 C60 88 80 80 84 56 C88 32 66 18 50 32Z","#FFB3A7")+P("M50 34 Q44 46 46 56")+P("M50 30 Q42 14 30 18 Q36 30 50 30Z",c.green)+face(56,62,7),
pineapple:()=>E(50,62,22,28,c.yellow)+P("M36 46 L62 80 M32 62 L46 84 M46 38 L70 66 M64 46 L38 80 M68 62 L54 84 M54 38 L30 66","none",'stroke-width="2"')+P("M50 36 L38 12 L47 24 L50 6 L53 24 L62 12Z",c.green),
lemon:()=>P("M10 54 Q20 26 50 26 Q80 26 90 54 Q80 82 50 82 Q20 82 10 54Z",c.lyellow)+face(50,56),
mango:()=>P("M30 30 C50 14 88 34 80 62 C74 86 40 92 26 74 C14 60 18 40 30 30Z","#FFC078")+P("M40 26 Q46 10 62 12 Q56 26 40 26Z",c.green)+face(52,58),
cherry:()=>P("M34 56 Q42 32 60 16 M66 60 Q64 36 60 16")+P("M60 16 Q74 6 84 16 Q72 26 60 16Z",c.green)+C(32,68,15,c.dred)+C(68,72,15,c.dred)+C(27,63,3,c.white,NS)+C(63,67,3,c.white,NS),
coconut:()=>C(50,56,32,c.dbrown)+E(50,38,22,9,c.white)+P("M58 38 L72 10","none",`stroke="${c.pink}" stroke-width="5"`)+face(50,62),
blueberries:()=>[[34,44],[60,40],[46,64],[70,64],[28,68]].map(([x,y])=>C(x,y,14,c.navy)+P(`M${x-4} ${y-8} L${x} ${y-4} L${x+4} ${y-8}`,"none",'stroke="#fff" stroke-width="2"')).join(""),

/* ---------- Animals ---------- */
dog:()=>E(26,42,9,18,c.dbrown,'transform="rotate(20 26 42)"')+E(74,42,9,18,c.dbrown,'transform="rotate(-20 74 42)"')+C(50,54,26,c.tan)+E(50,66,13,10,c.white)+E(50,60,5,4,K)+dot(41,48)+dot(59,48)+P("M46 68 Q50 72 54 68")+blush(34,60)+blush(66,60),
cat:()=>P("M27 44 L28 14 L48 32Z",c.orange)+P("M73 44 L72 14 L52 32Z",c.orange)+C(50,56,26,c.orange)+P("M47 58 L53 58 L50 62Z",c.pink)+P("M20 56 L36 58 M20 64 L36 62 M80 56 L64 58 M80 64 L64 62","none",'stroke-width="2"')+dot(41,50)+dot(59,50)+smile(50,64,3)+blush(36,62)+blush(64,62),
fish:()=>P("M64 50 L88 32 L84 50 L88 68Z",c.dblue)+P("M12 50 Q36 20 66 50 Q36 80 12 50Z",c.blue)+P("M38 34 Q44 26 52 34",c.dblue)+dot(28,46)+smile(24,54,3)+C(80,20,4,"none")+C(88,10,3,"none"),
bird:()=>C(46,56,26,c.blue)+P("M38 58 Q50 76 62 60",c.dblue)+P("M70 50 L86 54 L70 60Z",c.orange)+dot(56,46)+blush(60,56)+P("M40 82 L38 92 M52 82 L54 92")+P("M44 30 Q46 22 52 24 Q48 26 50 32"),
rabbit:()=>E(40,28,8,20,c.white)+E(60,28,8,20,c.white)+E(40,30,3.5,13,c.pink,NS)+E(60,30,3.5,13,c.pink,NS)+C(50,62,24,c.white)+dot(42,58)+dot(58,58)+P("M47 64 L53 64 L50 67Z",c.pink)+P("M50 67 L50 70 M45 72 Q50 75 55 72")+blush(36,68)+blush(64,68),
horse:()=>P("M36 90 L36 54 Q34 26 58 20 Q80 18 82 42 L84 60 Q84 70 74 70 L64 68 L60 90Z",c.tan)+P("M42 22 Q30 30 32 60 L38 54 Q36 34 46 26Z",c.dbrown)+P("M56 22 L58 10 L66 20",c.tan)+dot(66,40)+E(76,62,2,1.6,K,NS)+blush(70,52),
cow:()=>E(22,40,10,6,c.white)+E(78,40,10,6,c.white)+P("M32 30 Q28 18 34 14 M68 30 Q72 18 66 14")+E(50,52,26,24,c.white)+P("M30 40 Q36 30 46 36 Q42 46 32 46Z",K)+P("M62 34 Q72 34 72 44 Q64 46 60 40Z",K)+E(50,70,18,10,c.lpink)+dot(44,70,2)+dot(56,70,2)+dot(41,52)+dot(59,52),
pig:()=>P("M26 34 L30 16 L44 28Z",c.lpink)+P("M74 34 L70 16 L56 28Z",c.lpink)+C(50,54,28,c.lpink)+E(50,62,12,8,c.pink)+dot(45,62,2.2)+dot(55,62,2.2)+dot(40,48)+dot(60,48)+blush(32,58)+blush(68,58),
elephant:()=>C(22,48,17,c.grey)+C(78,48,17,c.grey)+C(50,46,24,c.lgrey)+P("M43 58 Q42 84 56 88 Q64 88 62 81 Q54 80 57 58Z",c.lgrey)+dot(42,44)+dot(58,44)+blush(36,54)+blush(64,54),
monkey:()=>C(22,50,10,c.skin)+C(78,50,10,c.skin)+C(50,50,26,c.dbrown)+P("M50 44 C40 34 28 42 32 56 C34 70 44 76 50 76 C56 76 66 70 68 56 C72 42 60 34 50 44Z",c.skin)+dot(43,52)+dot(57,52)+smile(50,62,5)+blush(38,62)+blush(62,62),
lion:()=>C(50,52,36,c.orange)+C(32,30,7,c.yellow)+C(68,30,7,c.yellow)+C(50,54,24,c.yellow)+E(50,64,9,7,c.cream)+P("M46 60 L54 60 L50 64Z",K)+dot(42,50)+dot(58,50)+blush(36,60)+blush(64,60),
panda:()=>C(28,30,10,K)+C(72,30,10,K)+C(50,54,28,c.white)+E(39,52,7,9,K,'transform="rotate(25 39 52)"')+E(61,52,7,9,K,'transform="rotate(-25 61 52)"')+C(40,51,2.4,c.white,NS)+C(60,51,2.4,c.white,NS)+E(50,62,4,3,K)+smile(50,66,3)+blush(32,64)+blush(68,64),
duck:()=>E(48,64,32,20,c.lyellow)+C(64,36,15,c.lyellow)+P("M76 36 L90 40 L76 44Z",c.orange)+dot(66,32)+P("M30 60 Q44 74 56 62",c.yellow)+blush(70,42),
butterfly:()=>E(32,38,19,17,c.purple)+E(68,38,19,17,c.purple)+E(34,66,14,12,c.pink)+E(66,66,14,12,c.pink)+C(32,38,6,c.lpurple,NS)+C(68,38,6,c.lpurple,NS)+E(50,52,6,24,c.dbrown)+P("M47 30 Q40 14 34 14 M53 30 Q60 14 66 14"),
frog:()=>C(32,34,12,c.green)+C(68,34,12,c.green)+C(32,34,6,c.white)+C(68,34,6,c.white)+dot(32,34)+dot(68,34)+E(50,60,34,24,c.green)+P("M32 62 Q50 76 68 62")+blush(26,66)+blush(74,66),
tiger:()=>C(28,32,9,c.orange)+C(72,32,9,c.orange)+C(50,54,28,c.orange)+P("M44 28 L46 38 M50 26 L50 38 M56 28 L54 38 M24 50 L34 52 M24 58 L34 58 M76 50 L66 52 M76 58 L66 58","none",'stroke-width="3.5"')+E(50,66,13,9,c.cream)+P("M46 61 L54 61 L50 65Z",K)+dot(41,50)+dot(59,50),
mouse:()=>C(30,36,13,c.grey)+C(70,36,13,c.grey)+C(30,36,7,c.lpink,NS)+C(70,36,7,c.lpink,NS)+C(50,58,22,c.lgrey)+C(50,64,3,c.pink)+P("M28 62 L40 63 M28 68 L40 66 M72 62 L60 63 M72 68 L60 66","none",'stroke-width="2"')+dot(43,54)+dot(57,54),
rat:()=>P("M80 70 Q96 70 92 86 Q88 94 70 90","none")+E(52,66,28,18,c.grey)+C(28,48,10,c.lgrey)+C(28,48,5,c.lpink,NS)+P("M24 58 L10 66 L24 70Z",c.grey)+C(10,66,3,c.pink)+dot(22,60),
goat:()=>P("M38 26 Q30 8 18 14 Q28 16 34 30Z",c.grey)+P("M62 26 Q70 8 82 14 Q72 16 66 30Z",c.grey)+E(24,42,11,5,c.white)+E(76,42,11,5,c.white)+P("M34 28 Q50 20 66 28 L62 70 Q50 82 38 70Z",c.white)+P("M46 78 L50 94 L54 78Z",c.lgrey)+dot(43,46)+dot(57,46)+E(46,66,1.8,1.4,K,NS)+E(54,66,1.8,1.4,K,NS),
zebra:()=>P("M36 90 L36 54 Q34 26 58 20 Q80 18 82 42 L84 60 Q84 70 74 70 L64 68 L60 90Z",c.white)+P("M46 26 L48 36 M58 22 L58 32 M40 48 L52 46 M40 60 L52 58 M40 72 L54 72 M40 84 L56 84 M70 26 L66 34","none",'stroke-width="4"')+P("M42 22 Q30 30 32 60 L38 54 Q36 34 46 26Z",K)+dot(66,42)+E(76,62,2,1.6,K,NS),
octopus:()=>P("M28 52 Q20 76 12 78 M38 58 Q34 82 26 88 M50 60 L50 90 M62 58 Q66 82 74 88 M72 52 Q80 76 88 78","none",`stroke="${c.purple}" stroke-width="8"`)+E(50,40,26,24,c.purple)+face(50,42),
ladybird:()=>C(50,28,13,K)+C(50,58,28,c.red)+P("M50 32 L50 86")+[[38,48],[62,48],[36,66],[64,66],[50,78]].map(([x,y])=>C(x,y,4.5,K,NS)).join("")+C(45,26,2.5,c.white,NS)+C(55,26,2.5,c.white,NS),
bee:()=>E(38,32,12,8,c.white,'opacity=".9"')+E(62,32,12,8,c.white,'opacity=".9"')+E(50,58,28,20,c.lyellow)+P("M42 40 Q38 58 42 76 M56 39 Q52 58 56 77","none",'stroke-width="5"')+P("M78 58 L88 58")+dot(28,54)+smile(28,61,3),
chick:()=>C(50,56,28,c.lyellow)+P("M46 28 Q44 18 50 20 Q54 18 52 28")+P("M44 58 L56 58 L50 66Z",c.orange)+dot(41,50)+dot(59,50)+P("M24 60 Q16 52 22 46",c.yellow)+blush(36,60)+blush(64,60),
hen:()=>P("M36 24 Q40 12 46 20 Q50 10 56 20 Q62 14 62 26Z",c.red)+E(50,62,30,24,c.white)+C(48,36,14,c.white)+P("M60 36 L72 40 L60 44Z",c.orange)+P("M58 46 Q60 54 54 52",c.red)+dot(50,34)+P("M30 60 Q44 74 58 62",c.lgrey)+P("M42 86 L40 94 M56 86 L58 94"),
bat:()=>P("M50 46 Q34 28 10 34 Q18 42 16 52 Q26 48 30 58 Q38 50 50 58 Q62 50 70 58 Q74 48 84 52 Q82 42 90 34 Q66 28 50 46Z",c.purple)+C(50,50,14,"#7950F2")+P("M40 40 L40 28 L46 38 M60 40 L60 28 L54 38","#7950F2")+C(45,48,4,c.white)+C(55,48,4,c.white)+dot(45,48,1.8)+dot(55,48,1.8),
bug:()=>C(20,60,11,c.green)+C(36,56,12,c.green)+C(52,58,12,c.green)+C(68,56,14,c.lime)+P("M64 42 L60 30 M74 42 L80 30")+C(60,30,3,K,NS)+C(80,30,3,K,NS)+dot(63,54)+dot(74,54)+smile(68,61,3),
ant:()=>P("M30 66 L20 84 M48 64 L46 86 M60 62 L72 84 M36 60 L24 46 M52 56 L56 42","none")+C(26,62,12,c.dbrown)+C(46,60,8,c.dbrown)+C(68,54,13,c.dbrown)+P("M66 42 L60 28 M74 42 L82 30")+C(64,52,3,c.white,NS)+C(74,52,3,c.white,NS),
fox:()=>P("M20 22 L34 46 L46 34Z",c.orange)+P("M80 22 L66 46 L54 34Z",c.orange)+P("M16 36 Q50 30 84 36 Q76 70 50 84 Q24 70 16 36Z",c.orange)+P("M24 50 Q40 56 50 84 Q30 72 24 50Z M76 50 Q60 56 50 84 Q70 72 76 50Z",c.white)+C(50,80,4,K)+dot(40,50)+dot(60,50),
crab:()=>P("M22 60 L10 70 M24 68 L14 80 M78 60 L90 70 M76 68 L86 80","none")+P("M30 46 Q20 32 26 22 M70 46 Q80 32 74 22")+P("M18 26 Q14 12 28 14 Q24 22 32 22 Q32 32 18 26Z",c.red)+P("M82 26 Q86 12 72 14 Q76 22 68 22 Q68 32 82 26Z",c.red)+E(50,62,28,18,c.red)+C(42,46,5,c.white)+C(58,46,5,c.white)+dot(42,46,2)+dot(58,46,2)+smile(50,64,4),
prawn:()=>P("M24 76 Q14 66 22 60 L30 64Z",c.pink)+P("M30 70 Q28 38 60 30 Q84 26 86 46 Q74 40 64 46 Q48 56 46 72Z","#FFA8A8")+P("M44 46 Q50 52 46 58 M54 38 Q60 44 56 50","none",'stroke-width="2"')+P("M80 32 Q60 6 30 10 M84 36 Q70 16 46 20","none",'stroke-width="2"')+dot(76,38),
crayfish:()=>P("M40 30 Q24 10 18 22 Q24 26 28 22 Q26 34 40 36Z",c.dred)+P("M60 30 Q76 10 82 22 Q76 26 72 22 Q74 34 60 36Z",c.dred)+E(50,50,13,20,c.red)+P("M38 66 L62 66 L58 78 L42 78Z",c.red)+P("M42 78 L36 92 L50 86 L64 92 L58 78Z",c.dred)+dot(45,40,2.2)+dot(55,40,2.2)+P("M37 52 L26 58 M37 58 L28 66 M63 52 L74 58 M63 58 L72 66","none",'stroke-width="2"'),
otter:()=>C(28,30,6,c.brown)+C(72,30,6,c.brown)+C(50,52,28,"#A47148")+E(50,64,16,12,"#F1D3B3")+E(50,58,5,3.6,K)+P("M50 61 L50 65 M45 67 Q50 70 55 67")+dot(40,46)+dot(60,46)+P("M30 62 L40 64 M30 68 L40 67 M70 62 L60 64 M70 68 L60 67","none",'stroke-width="2"'),
lizard:()=>P("M50 70 Q52 88 70 88 Q80 86 78 80","none",`stroke="${c.green}" stroke-width="7"`)+P("M40 36 L24 26 M60 36 L76 26 M40 62 L24 72 M60 62 L76 72","none",`stroke="${c.dgreen}" stroke-width="5"`)+E(50,50,12,22,c.green)+E(50,22,12,13,c.green)+dot(44,20)+dot(56,20)+smile(50,26,3),
mosquito:()=>E(36,36,12,7,c.white,'opacity=".9" transform="rotate(-30 36 36)"')+E(60,34,12,7,c.white,'opacity=".9" transform="rotate(30 60 34)"')+P("M40 52 L20 76 M48 54 L40 82 M56 52 L66 80 M62 48 L82 70","none",'stroke-width="2"')+E(50,48,8,14,c.grey)+C(50,30,7,c.grey)+P("M50 36 L50 22","none",'stroke-width="2"')+dot(47,28,1.8)+dot(53,28,1.8),
reindeer:()=>P("M36 34 L28 10 M30 18 L20 14 M32 24 L22 28 M64 34 L72 10 M70 18 L80 14 M68 24 L78 28","none",`stroke="${c.dbrown}" stroke-width="5"`)+E(28,44,8,5,"#A47148")+E(72,44,8,5,"#A47148")+C(50,58,24,"#A47148")+E(50,70,12,9,"#F1D3B3")+C(50,66,6,c.dred)+dot(42,52)+dot(58,52),
dragon:()=>P("M24 46 L12 36 L28 36 L24 20 L38 30 L42 14 L50 28 L58 14 L62 30 L76 20 L72 36 L88 36 L76 46Z",c.yellow)+P("M36 34 L28 8 L44 28Z M64 34 L72 8 L56 28Z",c.dgreen)+C(50,54,26,c.red)+E(50,68,14,9,"#FFA8A8")+dot(45,66,2)+dot(55,66,2)+P("M36 66 Q20 70 10 62 M64 66 Q80 70 90 62","none",`stroke="${c.gold}" stroke-width="3"`)+C(41,48,5,c.white)+C(59,48,5,c.white)+dot(41,48,2.2)+dot(59,48,2.2),
unicorn:()=>P("M30 40 Q18 50 22 72 Q30 60 34 52 Q30 66 38 74 Q38 58 44 48Z",c.pink)+P("M46 26 L54 2 L58 28Z",c.yellow)+P("M50 16 L56 14 M48 22 L57 20","none",'stroke-width="2"')+P("M38 92 Q30 50 46 32 Q62 22 74 34 Q86 46 84 62 Q82 72 72 72 L60 70 L56 92Z",c.white)+P("M40 30 Q48 18 62 24 Q52 26 46 36Z",c.purple)+E(36,30,4,8,c.white,'transform="rotate(-20 36 30)"')+P("M60 44 Q64 40 68 44")+P("M60 44 L58 40 M64 42 L64 38 M68 44 L70 40","none",'stroke-width="2"')+E(78,62,2,1.5,K,NS)+blush(66,54),
teddy:()=>C(28,26,11,c.tan)+C(72,26,11,c.tan)+C(28,26,5,c.brown,NS)+C(72,26,5,c.brown,NS)+E(50,82,24,16,c.tan)+C(50,46,24,c.tan)+E(50,54,10,8,c.cream)+E(50,51,4,3,K)+dot(41,42)+dot(59,42)+smile(50,56,3),

/* ---------- Food ---------- */
bread:()=>P("M16 50 C14 30 86 30 84 50 C84 56 78 58 76 58 L76 84 L24 84 L24 58 C22 58 16 56 16 50Z",c.tan)+P("M24 58 L24 84 L76 84 L76 58",c.cream)+face(50,68),
rice:()=>P("M18 50 Q20 26 50 24 Q80 26 82 50Z",c.white)+P("M34 36 l3 -1 M48 32 l3 1 M62 38 l3 -1 M42 44 l3 1 M56 46 l3 -1","none",'stroke-width="2"')+P("M12 50 L88 50 Q84 86 50 88 Q16 86 12 50Z",c.blue)+face(50,66),
noodles:()=>P("M58 10 L44 52 M70 12 L54 52","none",`stroke="${c.dbrown}" stroke-width="4"`)+P("M22 50 Q28 32 36 50 Q42 32 50 50 Q56 32 64 50 Q70 32 78 50","none",`stroke="${c.gold}" stroke-width="5"`)+P("M12 50 L88 50 Q84 86 50 88 Q16 86 12 50Z","#FF8787")+P("M22 64 L78 64","none",`stroke="${c.white}" stroke-width="3"`),
egg:()=>E(50,54,26,33,c.cream)+face(50,58),
milk:()=>P("M30 32 L50 16 L70 32 L70 88 L30 88Z",c.white)+P("M30 32 L70 32")+R(36,46,28,30,5,c.blue)+P("M50 52 C50 52 42 62 42 66 C42 71 46 73 50 73 C54 73 58 71 58 66 C58 62 50 52 50 52Z",c.white),
water:()=>P("M50 12 C50 12 22 48 22 64 C22 80 36 90 50 90 C64 90 78 80 78 64 C78 48 50 12 50 12Z",c.blue)+S("M34 62 Q34 74 44 78",c.white,4)+face(50,64),
cake:()=>R(20,48,60,34,6,c.lpink)+P("M20 56 Q26 64 32 56 Q38 64 44 56 Q50 64 56 56 Q62 64 68 56 Q74 64 80 56 L80 52 Q80 48 76 48 L24 48 Q20 48 20 52Z",c.white)+R(46,30,8,18,2,c.purple)+P("M50 16 Q57 25 50 30 Q43 25 50 16Z",c.yellow)+P("M12 84 L88 84")+face(50,70),
icecream:()=>P("M32 48 L50 92 L68 48Z",c.tan)+P("M38 60 L60 64 M42 72 L56 74","none",'stroke-width="2"')+C(50,38,20,c.lpink)+P("M34 46 Q36 54 40 48 Q44 56 48 48",c.lpink)+C(50,15,5,c.dred)+face(50,38,7),
cheese:()=>P("M12 40 L88 28 L88 74 L12 74Z",c.yellow)+P("M12 40 L60 16 L88 28Z",c.lyellow)+C(32,56,5,c.gold)+C(62,48,7,c.gold)+C(72,64,4,c.gold),
soup:()=>S("M38 36 Q34 28 38 20 M50 34 Q46 26 50 18 M62 36 Q58 28 62 20",c.grey,3)+P("M12 48 L88 48 Q84 86 50 88 Q16 86 12 48Z",c.lpurple)+E(50,48,38,8,c.orange)+face(50,68),
carrot:()=>P("M44 34 Q30 16 36 12 Q46 18 50 32 Q50 10 58 8 Q60 22 54 32 Q66 16 72 20 Q66 30 56 36Z",c.green)+P("M50 92 L30 40 Q50 28 70 40Z",c.orange)+P("M38 54 L46 54 M52 66 L58 66 M44 76 L50 76","none",'stroke-width="2"')+dot(44,46,2)+dot(56,46,2)+smile(50,52,3),
corn:()=>E(50,48,18,32,c.yellow)+P("M38 34 L62 34 M36 46 L64 46 M38 58 L62 58 M44 20 L44 76 M56 20 L56 76","none",'stroke-width="1.5" opacity=".6"')+P("M34 58 Q20 82 42 92 Q46 76 48 66Z",c.green)+P("M66 58 Q80 82 58 92 Q54 76 52 66Z",c.green),
mooncake:()=>C(50,52,34,"#D9893D")+C(50,52,26,"#F2B872")+P("M50 32 Q56 44 50 52 Q44 44 50 32Z M50 72 Q56 60 50 52 Q44 60 50 72Z M30 52 Q42 46 50 52 Q42 58 30 52Z M70 52 Q58 46 50 52 Q58 58 70 52Z","none",'stroke-width="2"'),
chickenrice:()=>E(50,68,42,16,c.blue)+E(50,64,36,12,c.white)+P("M20 62 Q22 36 46 36 Q60 38 60 62Z",c.white)+P("M48 62 L54 40 L72 40 L84 62Z","#FFD8A8")+P("M54 40 L72 40 L74 45 L53 45Z",c.tan)+P("M56 50 L77 50 M54 56 L80 56","none",'stroke-width="1.5" opacity=".5"')+C(26,72,5,c.green)+C(37,76,5,c.green),
satay:()=>P("M14 86 L86 14 M24 92 L92 26","none",`stroke="${c.tan}" stroke-width="3"`)+[[30,70],[44,56],[58,42],[40,76],[54,62],[68,48]].map(([x,y])=>R(x-7,y-6,14,12,4,"#B5651D",`transform="rotate(-45 ${x} ${y})"`)).join(""),
curry:()=>P("M12 48 L88 48 Q84 86 50 88 Q16 86 12 48Z",c.blue)+E(50,48,38,8,"#FFA94D")+C(36,46,4,c.lyellow)+C(56,48,5,c.lyellow)+C(66,45,3,c.green)+S("M40 34 Q36 26 40 18 M58 34 Q54 26 58 18",c.grey,3)+face(50,68),
dumpling:()=>P("M12 62 Q18 28 50 26 Q82 28 88 62 Q50 76 12 62Z",c.cream)+P("M38 30 Q40 38 36 46 M50 27 Q52 38 50 46 M62 30 Q64 38 64 46","none",'stroke-width="2"')+face(50,58,7),
tea:()=>S("M40 32 Q36 24 40 16 M56 32 Q52 24 56 16",c.grey,3)+P("M22 40 L78 40 L72 80 Q50 90 28 80Z",c.white)+E(50,40,28,6,c.lime)+P("M34 60 Q42 52 50 60 Q58 52 66 60","none",`stroke="${c.dblue}" stroke-width="3"`),
chopsticks:()=>P("M18 88 L80 10 M30 92 L88 18","none",`stroke="${c.dbrown}" stroke-width="7"`)+P("M70 22 L80 10 M80 26 L88 18","none",`stroke="${c.red}" stroke-width="7"`),
spoon:()=>G("rotate(-40 50 50)",E(50,28,15,19,c.lgrey)+R(45,44,10,46,5,c.lgrey)),
bowl:()=>E(50,46,38,8,c.cream)+P("M12 46 Q16 86 50 88 Q84 86 88 46 Q50 58 12 46Z",c.purple)+P("M24 66 Q50 74 76 66","none",`stroke="${c.white}" stroke-width="3"`)+face(50,70),
meatballs:()=>E(50,66,42,18,c.white)+C(36,56,13,c.dbrown)+C(62,56,13,c.dbrown)+C(49,66,13,c.brown)+[[24,70],[74,72],[30,76],[70,66]].map(([x,y])=>C(x,y,3.5,c.dred)).join(""),
fika:()=>S("M28 32 Q24 24 28 16 M40 32 Q36 24 40 16",c.grey,3)+P("M60 52 Q74 52 72 64 Q70 74 58 70",c.white)+P("M16 40 L62 40 L56 82 Q38 88 22 82Z",c.white)+E(39,40,23,5,c.dbrown)+C(76,74,14,c.tan)+S("M76 74 m-7 0 a7 7 0 1 0 7 -7 a4 4 0 1 0 -4 4",K,2.5),
gingerbread:()=>P(heartPath(50,52,30),c.brown)+P("M28 46 L34 52 L40 46 L46 52 L52 46 L58 52 L64 46 L70 52","none",`stroke="${c.white}" stroke-width="3"`)+dot(42,62)+dot(58,62)+smile(50,68,4),
snack:()=>C(50,50,32,c.tan)+[[38,38],[60,36],[48,54],[66,58],[36,62],[54,70]].map(([x,y])=>E(x,y,3.5,3,c.dbrown,NS)).join(""),
juice:()=>R(28,30,40,58,6,c.orange)+P("M54 30 L60 10 L68 10","none",`stroke="${c.pink}" stroke-width="4"`)+C(48,58,11,c.lyellow)+P("M48 47 L48 69 M37 58 L59 58 M40 50 L56 66 M56 50 L40 66","none",'stroke-width="1.5"'),

/* ---------- Body ---------- */
eye:()=>P("M10 50 Q50 14 90 50 Q50 86 10 50Z",c.white)+C(50,50,16,c.blue)+C(50,50,8,K)+C(45,45,3.5,c.white,NS)+P("M26 30 L21 21 M50 22 L50 12 M74 30 L79 21"),
ear:()=>P("M42 12 C68 8 84 30 78 54 C74 66 62 68 60 80 C58 92 42 96 34 86 C28 76 30 62 28 50 C24 30 28 14 42 12Z",c.skin)+P("M46 28 C62 26 68 44 58 52 C50 58 48 66 52 72"),
nose:()=>P("M50 14 C46 38 32 56 32 66 C32 78 44 80 50 75 C56 80 68 78 68 66 C68 56 54 38 50 14Z",c.skin)+E(43,70,3.5,2.4,K,NS)+E(57,70,3.5,2.4,K,NS),
mouth:()=>P("M12 50 Q30 30 50 40 Q70 30 88 50 Q70 78 50 78 Q30 78 12 50Z","#FF8787")+P("M12 50 Q50 60 88 50")+P("M30 54 L70 54 Q66 62 50 62 Q34 62 30 54Z",c.white),
hand:()=>P("M30 90 L30 56 L18 44 Q14 36 22 34 L34 46 L34 20 Q34 13 41 13 Q47 13 47 20 L47 42 L47 14 Q47 8 53 8 Q59 8 59 14 L59 42 L59 18 Q59 12 65 12 Q71 12 71 18 L71 46 L71 28 Q71 22 76 22 Q82 22 82 28 L82 62 Q82 90 60 90Z",c.skin),
foot:()=>P("M26 12 L54 12 L56 54 Q86 58 88 76 Q88 90 70 90 L34 90 Q22 90 24 74Z",c.skin)+C(86,70,4,c.skin)+C(80,62,3.5,c.skin),
leg:()=>P("M38 6 L62 6 L60 64 Q78 68 84 80 Q84 90 72 90 L44 90 Q38 90 38 80Z",c.skin)+P("M42 40 Q50 45 58 40")+P("M38 70 L60 70 L60 64 Q78 68 84 80 Q84 90 72 90 L44 90 Q38 90 38 80Z",c.blue),
tooth:()=>P("M24 24 Q24 12 38 14 Q50 18 62 14 Q76 12 76 24 Q76 46 68 62 L64 86 Q62 92 58 86 L52 64 Q50 60 48 64 L42 86 Q38 92 36 86 L32 62 Q24 46 24 24Z",c.white)+face(50,34,9),
hair:()=>P("M20 88 C10 40 28 14 50 14 C72 14 90 40 80 88Z",c.dbrown)+C(50,52,22,c.skin)+P("M28 46 C28 24 72 24 72 46 Q60 34 50 40 Q40 34 28 46Z",c.dbrown)+face(50,54,7)+P("M70 20 Q82 14 88 24 Q80 22 74 30Z",c.pink),
tongue:()=>C(50,50,38,c.skin)+happyEyes(50,40,12)+P("M30 56 Q50 64 70 56 Q66 72 50 72 Q34 72 30 56Z",K)+P("M41 64 Q40 86 50 86 Q60 86 59 64Z",c.pink)+blush(28,54)+blush(72,54),
thumb:()=>R(10,48,16,38,3,c.blue)+P("M26 50 L40 50 L46 22 Q48 12 56 16 Q61 20 58 30 L56 46 L78 46 Q86 46 84 54 Q87 60 81 62 Q87 66 81 72 Q85 78 77 80 L44 84 Q30 84 26 78Z",c.skin),
feet:()=>G("translate(-14 0) scale(.62) translate(14 26)",ART.foot())+G("translate(36 0) scale(.62) translate(14 26)",ART.foot()),

/* ---------- People ---------- */
mummy:()=>person({hair:"long",shirt:c.pink,earrings:1}),
daddy:()=>person({hair:"short",shirt:c.blue,hc:"#5C3A1E",beard:1}),
baby:()=>person({hair:"curl",shirt:c.lyellow,paci:1}),
girl:()=>person({hair:"pigtails",shirt:c.purple}),
boy:()=>person({hair:"short",shirt:c.green,hc:K,cap:c.red}),
teacher:()=>person({hair:"bun",shirt:c.orange,glasses:1}),
friend:()=>kidPair(),
doctor:()=>person({hair:"short",shirt:c.white,coat:1,steth:1,hc:K}),
grandma:()=>person({hair:"bun",shirt:c.purple,glasses:1,hc:c.grey}),
grandpa:()=>person({hair:"bald",shirt:c.brown,mous:1,hc:c.grey,glasses:1}),
queen:()=>person({hair:"long",shirt:c.purple,crown:1,hc:c.gold}),
king:()=>person({hair:"short",shirt:c.red,crown:1,beard:1,hc:c.dbrown}),
person:()=>person({hair:"short",shirt:c.lpurple}),

/* ---------- School and things ---------- */
book:()=>P("M50 34 Q30 24 8 30 L8 84 Q30 78 50 88 Q70 78 92 84 L92 30 Q70 24 50 34Z",c.purple)+P("M50 30 Q30 20 12 26 L12 78 Q30 72 50 82 Q70 72 88 78 L88 26 Q70 20 50 30Z",c.white)+P("M50 30 L50 82")+P("M20 38 L40 40 M20 48 L40 50 M20 58 L40 60 M60 40 L80 38 M60 50 L80 48 M60 60 L80 58","none",'stroke-width="2" opacity=".5"'),
pencil:()=>P("M18 82 L26 62 L70 18 L82 30 L38 74Z",c.yellow)+P("M18 82 L26 62 L38 74Z",c.skin)+P("M18 82 L21 75 L25 79Z",K)+P("M70 18 L82 30 L88 24 Q90 20 86 16 L80 10 Q76 8 74 12Z",c.pink),
crayon:()=>P("M16 84 L28 60 L72 16 Q78 10 84 16 Q90 22 84 28 L40 72Z",c.red)+P("M16 84 L28 60 L40 72Z","#FF8787")+P("M46 42 L58 54 M58 30 L70 42","none",`stroke="${c.white}" stroke-width="3"`),
schoolbag:()=>P("M36 30 Q36 12 50 12 Q64 12 64 30","none",'stroke-width="5"')+R(20,28,60,60,14,c.purple)+R(30,58,40,22,6,c.lpurple)+R(44,52,12,10,3,c.yellow)+P("M20 46 L80 46"),
chair:()=>P("M30 50 L28 90 M70 50 L72 90 M30 70 L70 70","none",'stroke-width="5"')+R(26,12,48,38,8,c.tan)+R(22,46,56,10,4,c.dbrown),
ball:()=>C(50,50,34,c.white)+P("M50 38 L61 46 L57 59 L43 59 L39 46Z",K)+P("M50 38 L50 16 M61 46 L82 40 M57 59 L70 78 M43 59 L30 78 M39 46 L18 40"),
scissors:()=>P("M44 52 L82 14 L86 20Z",c.lgrey)+P("M56 52 L18 14 L14 20Z",c.lgrey)+C(32,72,12,c.pink)+C(68,72,12,c.pink)+C(32,72,5,c.white)+C(68,72,5,c.white)+C(50,52,4,c.dgrey),
school:()=>R(16,44,68,44,3,c.lpink)+P("M10 46 L50 18 L90 46Z",c.red)+R(42,64,16,24,3,c.purple)+R(24,54,12,12,2,c.blue)+R(64,54,12,12,2,c.blue)+P("M50 18 L50 4 L62 8 L50 12",c.yellow),
bus:()=>R(10,28,80,46,10,c.yellow)+R(18,36,16,14,3,c.blue)+R(40,36,16,14,3,c.blue)+R(62,36,20,14,3,c.blue)+P("M10 58 L90 58")+C(30,76,9,c.dgrey)+C(70,76,9,c.dgrey)+C(30,76,3,c.lgrey,NS)+C(70,76,3,c.lgrey,NS)+C(84,64,3,c.orange),
palette:()=>P("M50 12 C24 12 10 32 12 52 C14 74 32 88 50 88 C60 88 62 80 58 72 C54 64 60 58 68 60 C80 62 90 56 88 42 C86 24 70 12 50 12Z",c.cream)+C(32,40,7,c.red)+C(50,28,7,c.yellow)+C(70,36,7,c.blue)+C(30,62,7,c.green)+C(48,72,5,c.purple),
numbers:()=>R(12,24,76,52,12,c.lyellow)+T(50,62,30,"123"),
abc:()=>R(8,30,28,30,6,c.pink)+R(36,40,28,30,6,c.lpurple)+R(64,30,28,30,6,c.blue)+T(22,53,20,"a")+T(50,63,20,"b")+T(78,53,20,"c"),
blocks:()=>R(6,36,28,30,6,c.lyellow)+R(36,36,28,30,6,c.lpink)+R(66,36,28,30,6,c.lpurple)+T(20,59,20,"c")+T(50,59,20,"a")+T(80,59,20,"t"),

/* ---------- Singapore ---------- */
mrt:()=>R(18,12,64,70,16,c.white)+R(26,20,48,26,6,c.blue)+R(18,54,64,8,0,c.dred,NS)+P("M18 54 L82 54 M18 62 L82 62")+C(32,72,4,c.lyellow)+C(68,72,4,c.lyellow)+P("M14 92 L86 92 M30 82 L24 92 M70 82 L76 92"),
taxi:()=>P("M8 68 L12 50 Q14 46 20 46 L30 46 L38 32 L64 32 L74 46 L84 48 Q92 50 92 58 L92 68Z",c.dblue)+R(40,22,20,10,3,c.lyellow)+T(50,30.5,7,"TAXI")+P("M40 36 L36 46 L50 46 L50 36Z M54 36 L54 46 L68 46 L62 36Z",c.white)+C(28,70,9,c.dgrey)+C(72,70,9,c.dgrey)+C(28,70,3,c.lgrey,NS)+C(72,70,3,c.lgrey,NS),
plane:()=>P("M44 50 L28 84 L40 84 L62 50Z",c.blue)+P("M44 50 L28 16 L40 16 L62 50Z",c.blue)+P("M16 50 L8 32 L18 34 L26 48Z",c.dblue)+E(50,50,40,10,c.white)+[40,52,64].map(x=>C(x,48,2.5,c.dblue,NS)).join("")+P("M86 46 Q92 50 86 54"),
umbrella:()=>P("M50 50 L50 82 Q50 90 42 88","none",'stroke-width="4"')+P("M10 50 Q50 2 90 50 Q80 42 70 50 Q60 42 50 50 Q40 42 30 50 Q20 42 10 50Z",c.red)+P("M50 20 Q40 30 30 50 M50 20 Q60 30 70 50","none",'stroke-width="2"')+P("M50 14 L50 8"),
beach:()=>R(4,40,92,24,0,c.blue,NS)+P("M4 64 Q30 56 50 64 Q70 72 96 62 L96 96 L4 96Z",c.lyellow)+C(76,22,10,c.yellow)+P("M4 46 Q12 42 20 46 Q28 50 36 46","none",`stroke="${c.white}" stroke-width="3"`)+P("M30 64 L36 40")+P("M18 46 Q34 26 52 38Z",c.pink),
palm:()=>P("M48 90 Q44 60 54 34 L60 36 Q52 60 58 90Z",c.tan)+P("M56 34 Q40 16 18 24 Q38 26 50 38Z",c.green)+P("M56 34 Q72 14 90 22 Q72 26 60 38Z",c.green)+P("M56 34 Q30 32 14 48 Q34 40 52 40Z",c.dgreen)+P("M58 34 Q80 32 88 50 Q74 40 60 40Z",c.dgreen)+C(52,42,5,c.dbrown)+C(61,42,5,c.dbrown)+P("M30 94 L80 94"),
shoes:()=>P("M8 72 L12 42 Q28 40 38 52 Q54 60 80 60 Q94 62 92 74 L8 74Z",c.purple)+R(6,72,88,10,5,c.white)+P("M36 50 L44 46 M42 56 L50 52 M48 60 L56 56","none",`stroke="${c.white}" stroke-width="3"`),
boots:()=>P("M30 12 L58 12 L60 60 Q86 62 88 78 L88 88 L28 88Z",c.green)+R(26,10,36,10,4,c.dgreen)+P("M28 88 L88 88 L88 80 L28 80","none"),
redpacket:()=>R(24,12,52,76,6,c.dred)+P("M24 30 Q50 48 76 30",c.red)+C(50,46,10,c.yellow)+T(50,77,22,"福",c.yellow),
lantern:()=>P("M50 6 L50 16")+R(38,14,24,8,3,c.gold)+E(50,50,30,28,c.red)+P("M50 22 Q34 50 50 78 M50 22 Q66 50 50 78","none",'stroke-width="2"')+R(38,76,24,8,3,c.gold)+P("M44 84 L42 96 M50 84 L50 98 M56 84 L58 96","none",`stroke="${c.red}" stroke-width="3"`),

/* ---------- Outside ---------- */
sun:()=>P([0,45,90,135,180,225,270,315].map(a=>{const r=Math.PI*a/180;return `M${(50+30*Math.cos(r)).toFixed(1)} ${(50+30*Math.sin(r)).toFixed(1)} L${(50+44*Math.cos(r)).toFixed(1)} ${(50+44*Math.sin(r)).toFixed(1)}`}).join(" "),"none",`stroke="${c.orange}" stroke-width="5"`)+C(50,50,24,c.yellow)+face(50,50),
moon:()=>P("M58 10 A40 40 0 1 0 90 62 A30 30 0 1 1 58 10Z",c.lyellow)+P("M28 52 Q32 48 36 52 M42 60 Q46 56 50 60")+blush(30,62)+smile(38,68,3),
star:()=>P(starPts(50,54,40,18),c.yellow)+face(50,56,7),
heart:()=>P(heartPath(50,52,36),c.pink),
tree:()=>R(44,58,12,32,3,c.brown)+C(50,38,24,c.green)+C(30,52,14,c.green)+C(70,52,14,c.green)+face(50,44),
flower:()=>P("M50 56 L50 92","none",`stroke="${c.dgreen}" stroke-width="4"`)+P("M50 78 Q64 64 76 72 Q64 84 50 78Z",c.green)+[0,72,144,216,288].map(a=>{const r=Math.PI*(a-90)/180;return C((50+17*Math.cos(r)).toFixed(1),(38+17*Math.sin(r)).toFixed(1),12,c.pink)}).join("")+C(50,38,10,c.yellow)+dot(46,37,1.8)+dot(54,37,1.8),
cloud:()=>P("M24 72 Q6 72 8 56 Q10 40 28 42 Q30 22 50 22 Q70 22 72 40 Q92 38 92 56 Q92 72 76 72Z",c.white)+face(50,52),
rain:()=>P("M24 52 Q6 52 8 38 Q10 24 28 26 Q30 8 50 8 Q70 8 72 24 Q92 22 92 38 Q92 52 76 52Z",c.lgrey)+[[30,64],[50,70],[70,64],[40,84],[60,86]].map(([x,y])=>P(`M${x} ${y-8} Q${x-6} ${y} ${x} ${y+4} Q${x+6} ${y} ${x} ${y-8}Z`,c.blue)).join("")+dot(42,36,2)+dot(58,36,2)+smile(50,40,3),
mountain:()=>P("M6 88 L36 28 L54 60 L66 44 L94 88Z","#91A7FF")+P("M28 44 L36 28 L44 44 L40 40 L36 46 L32 40Z",c.white)+P("M60 52 L66 44 L72 52 L66 50Z",c.white),
fire:()=>P("M50 8 C64 28 82 42 78 64 C76 82 62 92 50 92 C38 92 24 82 22 64 C20 48 34 38 40 24 C42 38 46 42 50 44 C54 32 52 20 50 8Z",c.orange)+P("M50 50 C58 60 66 66 62 78 C60 86 54 88 50 88 C44 88 38 84 38 76 C38 66 46 62 50 50Z",c.yellow),
rainbow:()=>[["#FF6B6B",38],["#FFA94D",31],["#FFE066",24],["#69DB7C",17],["#74C0FC",10]].map(([col,r])=>`<path d="M${50-r} 74 A${r} ${r} 0 0 1 ${50+r} 74" fill="none" stroke="${col}" stroke-width="7.5"/>`).join("")+E(14,76,12,7,c.white)+E(86,76,12,7,c.white),
snow:()=>G("translate(50 50)",[0,60,120].map(a=>G(`rotate(${a})`,P("M0 -40 L0 40 M-9 -30 L0 -22 L9 -30 M-9 30 L0 22 L9 30","none",`stroke="${c.dblue}" stroke-width="5"`))).join(""))+C(50,50,6,c.white),
field:()=>R(12,22,76,60,6,"#8CE99A")+P("M50 22 L50 82 M12 52 L88 52","none",'stroke-width="4"')+P("M22 36 l4 -6 l4 6 M64 36 l4 -6 l4 6 M22 66 l4 -6 l4 6 M64 66 l4 -6 l4 6","none",`stroke="${c.dgreen}" stroke-width="2.5"`),
forest:()=>[[26,62,.8],[74,62,.8],[50,54,1]].map(([x,y,s])=>G(`translate(${x} ${y}) scale(${s})`,R(-5,20,10,16,2,c.brown)+P("M0 -40 L-22 -6 L-12 -6 L-28 22 L28 22 L12 -6 L22 -6Z",c.dgreen))).join(""),
mushroom:()=>R(38,50,24,36,9,c.cream)+P("M12 54 Q12 14 50 14 Q88 14 88 54Z",c.red)+C(32,34,6,c.white,NS)+C(56,26,5,c.white,NS)+C(70,42,6,c.white,NS)+C(46,44,4,c.white,NS)+dot(45,66,2.2)+dot(55,66,2.2)+smile(50,71,3),
sailboat:()=>P("M8 84 Q30 78 50 84 Q70 90 92 84","none",`stroke="${c.dblue}" stroke-width="4"`)+P("M50 10 L50 66")+P("M50 12 L50 62 L18 62Z",c.white)+P("M54 22 L54 62 L80 62Z",c.lpink)+P("M14 66 L86 66 L74 80 L26 80Z",c.dred),
summerhouse:()=>P("M6 46 L50 14 L94 46Z","#495057")+R(16,44,68,44,0,"#C92A2A")+P("M16 44 L16 88 M84 44 L84 88","none",`stroke="${c.white}" stroke-width="5"`)+R(42,62,16,26,2,c.white)+R(24,54,12,12,2,c.blue,`stroke="${c.white}" stroke-width="3"`)+R(64,54,12,12,2,c.blue,`stroke="${c.white}" stroke-width="3"`)+R(64,20,8,14,0,"#C92A2A"),
midsummer:()=>P("M2 92 L98 92","none",`stroke="${c.dgreen}" stroke-width="6"`)+P("M50 92 L50 10 M24 30 L76 30","none",`stroke="${c.green}" stroke-width="6"`)+C(24,44,10,"none",`stroke="${c.green}" stroke-width="5"`)+C(76,44,10,"none",`stroke="${c.green}" stroke-width="5"`)+P("M24 30 L24 34 M76 30 L76 34")+[[50,14],[38,30],[62,30],[24,54],[76,54],[16,44],[84,44]].map(([x,y],i)=>C(x,y,3.5,[c.pink,c.yellow,c.white,c.purple][i%4])).join(""),
swedenflag:()=>P("M10 12 L10 92","none",'stroke-width="4"')+R(12,16,78,52,3,"#2F6FD0")+R(34,16,12,52,0,c.yellow,NS)+R(12,36,78,12,0,c.yellow,NS)+R(12,16,78,52,3,"none"),

/* ---------- Winter and Christmas ---------- */
snowman:()=>C(50,70,22,c.white)+C(50,36,16,c.white)+R(36,8,28,16,2,K)+R(30,22,40,5,2,K)+P("M50 38 L66 42 L50 44Z",c.orange)+dot(44,32)+dot(56,32)+P("M34 48 Q50 56 66 48 L66 54 Q50 60 34 54Z",c.red)+dot(50,66,2.4)+dot(50,76,2.4),
sledge:()=>P("M10 70 L82 70 Q92 70 92 60","none",`stroke="${c.red}" stroke-width="5"`)+P("M24 70 L24 56 M70 70 L70 56","none",'stroke-width="4"')+R(14,46,70,10,3,c.tan)+R(14,36,70,10,3,c.brown)+P("M84 40 Q94 30 90 20","none",'stroke-width="3"'),
skates:()=>P("M24 12 L52 12 L54 52 Q80 54 82 66 L82 72 L22 72Z",c.white)+P("M34 22 L44 22 M34 32 L46 32 M34 42 L48 42","none",`stroke="${c.pink}" stroke-width="3"`)+P("M28 72 L28 82 M76 72 L76 82","none",'stroke-width="3"')+P("M16 84 L86 84 Q92 84 90 78","none",`stroke="${c.dgrey}" stroke-width="4"`),
mittens:()=>G("rotate(-12 34 52)",P("M22 84 L20 48 Q18 22 34 22 Q48 22 48 44 L54 40 Q60 38 60 46 L50 60 L48 84Z",c.red)+R(18,78,32,12,4,c.white))+G("rotate(12 66 52)",P("M78 84 L80 48 Q82 22 66 22 Q52 22 52 44 L46 40 Q40 38 40 46 L50 60 L52 84Z",c.red)+R(50,78,32,12,4,c.white)),
scarf:()=>P("M20 20 Q50 34 80 20 L84 32 Q50 48 16 32Z",c.purple)+P("M60 38 L70 82 L56 84 L48 42Z",c.purple)+P("M58 52 L66 50 M60 62 L68 60 M62 72 L70 70","none",`stroke="${c.white}" stroke-width="3"`)+P("M58 84 L57 92 M63 84 L63 92 M68 83 L69 91","none",'stroke-width="2"'),
xmastree:()=>R(44,78,12,14,2,c.brown)+P("M50 14 L26 46 L36 46 L18 78 L82 78 L64 46 L74 46Z",c.dgreen)+P(starPts(50,14,10,4.5),c.yellow)+[[40,40],[60,52],[34,66],[54,68],[70,70]].map(([x,y],i)=>C(x,y,4,[c.red,c.blue,c.yellow,c.pink,c.purple][i])).join(""),
tomte:()=>P("M24 52 Q24 94 50 94 Q76 94 76 52Z",c.white)+P("M20 54 L50 8 L80 54Z",c.red)+C(50,8,5,c.white)+R(18,48,64,9,4,c.white)+C(50,60,8,c.lpink)+P("M36 66 Q50 74 64 66","none"),
candle:()=>C(50,26,16,c.lyellow,NS+' opacity=".55"')+R(38,42,24,48,4,c.white)+P("M50 12 Q60 26 50 34 Q40 26 50 12Z",c.orange)+P("M50 20 Q55 28 50 32 Q45 28 50 20Z",c.yellow)+P("M50 34 L50 42"),
present:()=>R(16,42,68,46,4,c.purple)+R(12,30,76,14,4,c.lpurple)+R(44,30,12,58,0,c.pink)+P("M50 30 Q34 10 26 20 Q30 30 50 30 Q70 30 74 20 Q66 10 50 30Z",c.pink),

/* ---------- Phonics extras ---------- */
hat:()=>R(30,20,40,46,4,c.dgrey)+R(30,52,40,8,0,c.red)+E(50,68,40,9,c.dgrey),
kite:()=>P("M60 70 Q50 82 58 92 Q66 98 60 98","none",'stroke-width="2"')+P("M60 8 L86 38 L60 70 L34 38Z",c.pink)+P("M60 8 L60 70 M34 38 L86 38")+P("M60 8 L86 38 L60 38Z",c.yellow,NS)+P("M34 38 L60 70 L60 38Z",c.blue,NS)+P("M60 8 L86 38 L60 70 L34 38Z","none")+P("M60 8 L60 70 M34 38 L86 38"),
web:()=>G("translate(50 50)",[0,45,90,135].map(a=>G(`rotate(${a})`,P("M0 -42 L0 42","none",'stroke-width="2"'))).join("")+[14,26,38].map(r=>P([0,45,90,135,180,225,270,315,360].map((a,i)=>{const t=Math.PI*a/180;return (i?"L":"M")+(r*Math.sin(t)).toFixed(1)+" "+(-r*Math.cos(t)).toFixed(1)}).join(""),"none",'stroke-width="2"')).join(""))+P("M70 16 L70 34","none",'stroke-width="2"')+C(70,38,6,K),
van:()=>P("M8 72 L8 36 Q8 28 16 28 L66 28 Q74 28 80 38 L90 52 L92 72Z",c.lpurple)+P("M66 34 L76 50 L60 50 L60 34Z",c.blue)+R(16,36,36,14,3,c.blue)+C(28,74,9,c.dgrey)+C(72,74,9,c.dgrey)+C(28,74,3,c.lgrey,NS)+C(72,74,3,c.lgrey,NS),
yoyo:()=>P("M50 8 L50 36","none",'stroke-width="2"')+C(50,6,4,"none")+C(50,62,28,c.red)+C(50,62,16,c.lpink)+C(50,62,5,c.white),
box:()=>P("M14 38 L50 26 L86 38 L50 50Z",c.tan)+P("M14 38 L50 50 L50 90 L14 78Z","#D9893D")+P("M86 38 L50 50 L50 90 L86 78Z",c.tan)+P("M14 38 L6 28 L42 16 L50 26 M86 38 L94 28 L58 16 L50 26",c.tan),
ship:()=>P("M66 26 Q72 14 86 14","none",`stroke="${c.grey}" stroke-width="4"`)+R(56,24,14,18,2,c.red)+R(56,24,14,5,0,K)+R(28,40,48,16,3,c.white)+[36,48,60].map(x=>C(x,48,3,c.blue)).join("")+P("M6 56 L94 56 L80 82 L20 82Z","#364FC7")+P("M4 88 Q28 80 50 88 Q72 96 96 88","none",`stroke="${c.blue}" stroke-width="4"`),
ring:()=>E(50,62,24,22,"none",`stroke="${c.gold}" stroke-width="8"`)+P("M38 26 L44 18 L56 18 L62 26 L50 40Z",c.blue)+P("M38 26 L62 26","none",'stroke-width="2"'),
shell:()=>P("M50 86 L14 44 Q50 2 86 44Z",c.lpink)+P("M50 86 L28 26 M50 86 L50 18 M50 86 L72 26","none",'stroke-width="2"')+P("M40 86 L60 86 L56 92 L44 92Z",c.pink),
bed:()=>R(8,30,12,58,3,c.tan)+R(18,52,74,20,4,c.white)+E(32,48,12,7,c.white)+R(44,46,48,26,6,c.blue)+P("M18 72 L18 88 M88 72 L88 88","none",'stroke-width="5"'),
map:()=>P("M8 22 L36 14 L64 22 L92 14 L92 78 L64 86 L36 78 L8 86Z",c.lyellow)+P("M36 14 L36 78 M64 22 L64 86","none",'stroke-width="2"')+P("M18 66 Q30 50 44 56 Q58 62 70 40","none",`stroke="${c.red}" stroke-width="3" stroke-dasharray="4 5"`)+P("M72 30 L82 40 M82 30 L72 40","none",`stroke="${c.red}" stroke-width="4"`),
pen:()=>P("M16 84 L24 66 L70 20 L80 30 L34 76Z",c.blue)+P("M16 84 L24 66 L34 76Z",c.lgrey)+P("M70 20 L80 30 L86 24 Q88 20 84 16 L78 12 Q74 10 72 14Z",c.navy)+P("M58 30 L74 14","none",`stroke="${c.lgrey}" stroke-width="3"`),
net:()=>P("M14 86 L14 22 L86 22 L86 86","none",'stroke-width="5"')+P("M26 22 L26 86 M38 22 L38 86 M50 22 L50 86 M62 22 L62 86 M74 22 L74 86 M14 34 L86 34 M14 46 L86 46 M14 58 L86 58 M14 70 L86 70","none",'stroke-width="1.5" opacity=".6"')+P("M6 88 L94 88","none",`stroke="${c.dgreen}" stroke-width="4"`),
nut:()=>P("M50 10 C68 10 72 30 62 44 C74 56 74 90 50 90 C26 90 26 56 38 44 C28 30 32 10 50 10Z","#E8C08A")+[[44,24],[56,30],[44,62],[56,70],[50,78]].map(([x,y])=>C(x,y,1.8,c.dbrown,NS)).join(""),
pan:()=>R(60,46,36,10,5,c.dgrey,'transform="rotate(-20 60 46)"')+C(40,56,30,c.dgrey)+C(40,56,24,"#868E96")+P("M28 52 Q26 40 40 42 Q54 40 52 54 Q54 68 40 66 Q26 68 28 52Z",c.white)+C(40,54,7,c.yellow),
ten:()=>R(20,14,60,72,10,c.lpurple)+T(50,64,38,"10"),
six:()=>R(20,14,60,72,10,c.lyellow)+T(50,66,44,"6"),
bath:()=>P("M76 40 L76 26 Q76 18 68 18 L62 18","none",'stroke-width="4"')+C(30,40,7,c.lblue||"#D0EBFF")+C(44,36,9,"#D0EBFF")+C(58,40,7,"#D0EBFF")+P("M10 46 L90 46 L84 74 Q80 82 70 82 L30 82 Q20 82 16 74Z",c.white)+P("M26 82 L22 92 M74 82 L78 92","none",'stroke-width="4"'),
sock:()=>P("M32 10 L60 10 L60 56 Q60 66 70 68 L80 70 Q90 74 86 84 Q82 92 70 90 L40 86 Q30 84 30 72Z",c.red)+R(30,8,32,12,3,c.white)+P("M32 34 L60 34 M32 46 L60 46","none",`stroke="${c.white}" stroke-width="4"`),
rock:()=>P("M14 76 Q8 54 24 40 Q34 22 56 24 Q78 24 86 46 Q94 66 82 78 Q50 88 14 76Z",c.grey)+face(50,58),
drum:()=>P("M78 14 L58 40 M22 14 L42 40","none",`stroke="${c.tan}" stroke-width="4"`)+C(78,14,4,c.tan)+C(22,14,4,c.tan)+R(16,44,68,40,4,c.red)+E(50,44,34,9,c.white)+E(50,84,34,9,c.red)+P("M18 50 L32 78 L50 50 L68 78 L82 50","none",`stroke="${c.yellow}" stroke-width="3"`),
flag:()=>P("M24 10 L24 92","none",'stroke-width="5"')+P("M26 14 Q46 6 60 16 Q74 26 90 16 L90 52 Q74 62 60 52 Q46 42 26 50Z",c.red),
clock:()=>C(26,20,10,c.yellow)+C(74,20,10,c.yellow)+P("M30 84 L24 94 M70 84 L76 94","none",'stroke-width="4"')+C(50,54,32,c.white,`stroke="${c.purple}" stroke-width="6"`)+P("M50 54 L50 34 M50 54 L64 62","none",'stroke-width="4"')+C(50,54,3,K),
tent:()=>P("M8 86 L50 16 L92 86Z",c.green)+P("M50 16 L38 86 L62 86Z",c.dgreen)+P("M4 88 L96 88"),

/* ---------- Icons ---------- */
speaker:()=>P("M14 38 L32 38 L54 18 L54 82 L32 62 L14 62Z","currentColor")+P("M66 34 Q76 50 66 66 M76 24 Q92 50 76 76","none",'stroke="currentColor" stroke-width="7"'),
mic:()=>R(36,10,28,48,14,"currentColor",NS)+P("M24 44 Q24 70 50 70 Q76 70 76 44 M50 70 L50 86 M36 88 L64 88","none",'stroke="currentColor" stroke-width="7"'),
home:()=>P("M10 50 L50 14 L90 50 L80 50 L80 88 L20 88 L20 50Z",c.lpink)+R(42,62,16,26,3,c.purple),
back:()=>P("M60 18 L28 50 L60 82","none",`stroke="${c.purple}" stroke-width="12"`),
next:()=>P("M40 18 L72 50 L40 82","none",'stroke="currentColor" stroke-width="12"'),
prev:()=>P("M60 18 L28 50 L60 82","none",'stroke="currentColor" stroke-width="12"'),
gear:()=>G("translate(50 50)",[0,45,90,135,180,225,270,315].map(a=>R(-8,-44,16,20,3,c.purple,`transform="rotate(${a})"`)).join("")+C(0,0,32,c.purple)+C(0,0,12,c.white)),
speech:()=>P("M14 20 Q14 10 24 10 L76 10 Q86 10 86 20 L86 58 Q86 68 76 68 L42 68 L22 86 L26 68 L24 68 Q14 68 14 58Z",c.lpurple)+dot(34,40,4)+dot(50,40,4)+dot(66,40,4),
eyes:()=>E(30,50,18,22,c.white)+E(70,50,18,22,c.white)+C(34,54,9,K)+C(74,54,9,K)+C(36,50,3,c.white,NS)+C(76,50,3,c.white,NS),
dice:()=>R(14,14,72,72,16,c.white)+dot(32,32,6)+dot(68,32,6)+dot(50,50,6)+dot(32,68,6)+dot(68,68,6),
sparkle:()=>P("M50 6 Q54 44 94 50 Q54 56 50 94 Q46 56 6 50 Q46 44 50 6Z",c.yellow),
recdot:()=>C(50,50,30,c.dred,NS),
lock:()=>P("M32 46 L32 32 Q32 14 50 14 Q68 14 68 32 L68 46","none",'stroke-width="7"')+R(22,44,56,44,8,c.lpurple)+C(50,64,6,K)
};

window.ART=ART;
window.art=function(name,cls=""){
  const f=ART[name];const inner=f?f():T(50,62,40,"?");
  return `<svg class="art ${cls}" viewBox="0 0 100 100" aria-hidden="true">${inner}</svg>`};
})();
