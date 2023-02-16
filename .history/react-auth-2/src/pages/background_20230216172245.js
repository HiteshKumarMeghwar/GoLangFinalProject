const background = {
	sunny: 'linear-gradient(284deg, #abccbb 26%, rgba(255,255,255,0) 69%), linear-gradient(160deg, #e4b814 52%, rgba(255,255,255,0) 62%), linear-gradient(147deg, #e37669 89%, rgba(255,255,255,0) 96%), linear-gradient(219deg, #f3d0dd 18%, rgba(255,255,255,0) 65%), radial-gradient(ellipse at -173% -79%, rgba(255,255,255,0) 0%, #271807 54%)',
	clear: 'linear-gradient(72deg, #cce0d5 15%, rgba(255,255,255,0) 90%), linear-gradient(195deg, #f3b685 5%, rgba(255,255,255,0) 50%), linear-gradient(350deg, #20674a 29%, rgba(255,255,255,0) 78%), linear-gradient(228deg, #843e84 14%, rgba(255,255,255,0) 96%), radial-gradient(circle at -76% -48%, rgba(255,255,255,0) 0%, #d299cf 54%)',
	cloudy: 'linear-gradient(72deg, #d8d7f6 33%, rgba(255,255,255,0) 90%), radial-gradient(circle at -76% -48%, rgba(255,255,255,0) 0%, #99a2d2 84%)',
	rainy: 'linear-gradient(72deg, #62aff7 0%, rgba(255,255,255,0) 90%), radial-gradient(circle at -76% -48%, rgba(255,255,255,0) 0%, #bcc6fc 84%)',
	snow: 'linear-gradient(180deg, #cfcfcf 2%, rgba(233, 233, 233, 0) 89%), linear-gradient(185deg, rgba(255,255,255,0) 0%, #ffecfe 1%)',
	overcast:
		'linear-gradient(185deg, rgba(255,255,255,0) 0%, #7d7d7d 106%), linear-gradient(180deg, #6e97ff 2%, rgba(233, 233, 233, 0) 89%)',
};

export const gradient = [
	'repeating-radial-gradient(ellipse at 60% 77%, hsla(210,10.81%,14.51%,0.009822101773725667) 39%, hsla(44.85,94.29%,20.59%,0.3278170955865638) 5%), linear-gradient(134deg, hsla(261.32,50.67%,70.59%,0.9911964020353863) 0%, hsla(262.67,88.24%,10%,0.30437947288325873) 94%), linear-gradient(340deg, hsla(330.91,67.35%,90.39%,0.5604774978383413) 32%, hsla(189.89,88.35%,79.8%,0.7291131775249668) 54%), repeating-linear-gradient(187deg, hsla(215.75,98.36%,52.16%,0.7091023545418649) 74%, hsla(27.43,98.59%,72.16%,0.37543637385899586) 8%), repeating-radial-gradient(circle at 24% 55%, hsl(260.77,50%,10.2%) 60%, hsl(162.35,73.91%,9.02%) 87%)',
	'linear-gradient(33deg, hsla(151.82,31.43%,58.82%,0.5517922183652673) 27%, hsla(189.89,88.35%,79.8%,0.93122214042818) 78%), conic-gradient(from 243deg at 61% 93%, hsla(215.75,98.36%,52.16%,0.08280006860531275) 0%, hsla(162.22,72.19%,36.67%,0.4669158953342156) 74%), radial-gradient(circle at 66% 24%, hsla(190.67,88.24%,90%,0.586235274783532) 50%, hsla(261.32,50.67%,70.59%,0.11131293501613859) 82%), repeating-radial-gradient(circle at 3% 6%, hsla(189.89,90.1%,19.8%,0.1362916535741665) 36%, hsla(152.73,31.43%,72.55%,0.22410693506162205) 4%), conic-gradient(from 41deg at 96% 0%, hsl(210,10.81%,70.98%) 2%, hsl(263.08,88.35%,20.2%) 51%)',
	'linear-gradient(188deg, hsla(190.04,89.72%,49.61%,0.1897263883112188) 100%, hsla(210,10.34%,22.75%,0.5068343469611551) 84%), radial-gradient(ellipse at 59% 61%, hsla(261.26,50.6%,50.78%,0.5192990623199953) 14%, hsla(261.18,50.5%,80.2%,0.2540108476104066) 98%), linear-gradient(335deg, hsla(152.73,68.75%,6.27%,0.9064370590127901) 14%, hsla(190.04,89.72%,49.61%,0.7034622068034408) 39%), linear-gradient(327deg, hsla(210,10.81%,14.51%,0.10723250711727328) 1%, hsla(260.77,50%,10.2%,0.5792192914729732) 36%), linear-gradient(113deg, hsl(190.15,89.47%,29.8%) 53%, hsl(27.43,85.37%,32.16%) 78%)',
	'linear-gradient(2deg, hsla(215.83,98.63%,71.37%,0.9500506434976812) 25%, hsla(44.85,100%,80.59%,0.8456768093203133) 79%), linear-gradient(259deg, #000013 31%, hsl(152.73,31.43%,72.55%) 78%), linear-gradient(275deg, hsla(45.1,100%,70.78%,0.72235926507412) 27%, hsla(263.08,90.1%,80.2%,0.012267129884226513) 35%)',
	'linear-gradient(210deg, hsla(262.67,89.4%,70.39%,0.643352250704994) 0%, hsla(262.67,89.4%,70.39%,0.668547953325233) 0%), linear-gradient(180deg, #0a58ca 50%, hsla(190.67,88.24%,10%,0.4) 100%)',
	'linear-gradient(210deg, hsla(330.18,66.53%,51.96%,0.38577015486707533) 0%, hsla(215.63,97.96%,80.78%,0.0744358104081635) 0%), linear-gradient(180deg, hsl(45,100%,51.37%) 0%, hsl(330.91,67.35%,90.39%) 100%)',
	'linear-gradient(180deg, hsla(330.18,66.53%,51.96%,0.38577015486707533) 51%, hsla(215.63,97.96%,80.78%,0.0744358104081635) 100%), linear-gradient(180deg, hsl(45,100%,51.37%) 0%, hsl(330.91,67.35%,90.39%) 100%)',
	'linear-gradient(360deg, hsla(152.18,68.75%,31.37%,0.3684701392424077) 0%, hsla(261.32,50.67%,70.59%,0.8354880270887359) 100%), linear-gradient(180deg, hsl(261.39,50.25%,60.59%) 0%, hsl(44.85,100%,61.18%) 100%)',
	'radial-gradient(ellipse at -94% -129%, #8a4a10 39%, rgba(255,255,255,0) 97%), radial-gradient(circle at 119% -64%, #67a487 19%, rgba(255,255,255,0) 84%), radial-gradient(ellipse at 48% -152%, #f3d0dd 48%, rgba(255,255,255,0) 85%), linear-gradient(342deg, rgba(255,255,255,0) 5%, #468d8d 29%), linear-gradient(344deg, rgba(255,255,255,0) 0%, #89b8a0 54%)',
	'linear-gradient(141deg, hsla(330.31,65.99%,71.18%,0.1607494099491289) 14%, hsla(210,10.81%,70.98%,0.9194609764222181) 87%), linear-gradient(201deg, hsla(45.6,100%,90.2%,0.9359606744722324) 32%, hsla(330.18,66.53%,51.96%,0.96523543264155) 80%), linear-gradient(108deg, hsla(27.3,98.31%,53.53%,0.27690715698278967) 48%, hsla(261.26,50.6%,50.78%,0.06701775904103857) 83%), repeating-conic-gradient(from 146deg at 92% 76%, hsla(162.09,72.04%,18.24%,0.6126526328572828) 39%, hsla(26.81,85.45%,10.78%,0.04373514570344961) 91%), repeating-linear-gradient(5deg, hsl(210,15.79%,92.55%) 46%, hsl(152.05,38.26%,45.1%) 90%)',
	'linear-gradient(54deg, hsla(208.24, 100%, 50%, 0.62) 0%, hsla(354.18,70.53%,62.75%,0.9347686798933794) 100%), linear-gradient(360deg, hsla(44.85,100%,61.18%,0.9969105939397549) 0%, hsla(354.18, 62.15%, 77.21%, 0.5) 100%)',
	'radial-gradient(ellipse at -94% -129%, #e0e0e0 0%, rgba(255,255,255,0) 97%), radial-gradient(circle at 119% -64%, #cacaca 29%, rgba(255,255,255,0) 84%), radial-gradient(ellipse at 48% -152%, #f6fec7 16%, rgba(255,255,255,0) 85%), linear-gradient(342deg, rgba(255,255,255,0) 5%, #d2d2d2 100%), linear-gradient(344deg, rgba(255,255,255,0) 0%, #b2e5cb 33%)',
];

export default background;