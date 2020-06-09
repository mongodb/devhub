import React from 'react';
import { useTheme } from 'emotion-theming';

export default ({ color, ...props }) => {
    const theme = useTheme();
    const iconColor = color ? color : theme.colorMap.greyLightTwo;
    return (
        <svg width="140px" height="37px" viewBox="0 0 140 37" {...props}>
            <title>MongoDB Icon</title>
            <g
                transform="translate(-120, -3350)"
                fill={iconColor}
                fillRule="nonzero"
            >
                <g transform="translate(0, 3246)">
                    <g transform="translate(120, 104)">
                        <path d="M137.999557,28.9998286 C136.898766,28.999723 136.005053,28.1099006 136.000021,27.0090186 C135.995031,25.9081366 136.880608,25.0102142 137.981352,25.0000864 C139.082096,24.9899586 139.984041,25.8714343 139.999284,26.9722222 C140.013748,27.5094601 139.808629,28.0293848 139.431264,28.412011 C139.053899,28.7946372 138.536893,29.006905 137.999557,28.9998286 M137.999557,25.180608 C137.26245,25.1747599 136.594576,25.6140643 136.307988,26.2932651 C136.021399,26.9724658 136.172673,27.7574742 136.69113,28.2815105 C137.209587,28.8055469 137.992873,28.9651553 138.675013,28.685762 C139.357153,28.4063686 139.803478,27.7431316 139.805451,27.0059354 C139.814903,26.5223413 139.628308,26.055497 139.288141,25.7116695 C138.947974,25.367842 138.483179,25.1762871 137.999557,25.180608 M138.481129,28.264159 L137.975478,27.1528285 L137.560122,27.1528285 L137.560122,28.264159 L137.257936,28.264159 L137.257936,25.7356713 L138.004372,25.7356713 C138.559384,25.7356713 138.790538,25.9824999 138.790538,26.4436479 C138.790538,26.8144927 138.615969,27.0456688 138.290908,27.1167072 L138.824248,28.262955 L138.481129,28.264159 Z M137.549287,26.8879393 L137.987517,26.8879393 C138.341473,26.8879393 138.476313,26.7675351 138.476313,26.4448519 C138.476313,26.1221687 138.346288,26.0113969 137.947788,26.0113969 L137.549287,26.0113969 L137.549287,26.8879393 Z" />
                        <path d="M106.759486,27.0503765 C107.315458,27.5112199 108.423695,27.7006777 109.402206,27.7006777 C110.669821,27.7006777 111.912727,27.4574548 113.127216,26.3207078 C114.362709,25.1557982 115.215199,23.36875 115.215199,20.5268825 C115.215199,17.7925452 114.210744,15.5728163 112.149942,14.273494 C110.987343,13.5156627 109.481277,13.2173946 107.763942,13.2173946 C107.262332,13.2173946 106.759486,13.2442771 106.469146,13.3799699 C106.351248,13.4775007 106.267483,13.6124093 106.230696,13.764006 C106.178805,14.2517319 106.178805,17.960241 106.178805,20.1530873 C106.178805,22.3996988 106.178805,25.5398343 106.230696,25.9136295 C106.257876,26.2387801 106.416019,26.8097139 106.759486,27.0503765 M101.49011,12 C101.938594,12 103.644809,12.0806476 104.437995,12.0806476 C105.920587,12.0806476 106.948517,12 109.722198,12 C112.047396,12 114.003181,12.6503012 115.405465,13.8945783 C117.096855,15.410241 118,17.5224398 118,20.0942018 C118,23.7476657 116.393859,25.854744 114.776599,27.0503765 C113.164281,28.2959337 111.070121,29 108.091348,29 C106.504975,29 103.783184,28.9462349 101.511113,28.9193524 L101.480226,28.9193524 C101.375209,28.7017319 101.674198,27.8581325 101.860757,27.8363705 C102.478504,27.7634036 102.641589,27.7390813 102.926988,27.6174699 C103.405123,27.4126506 103.518789,27.1591867 103.573151,26.2656627 C103.650987,24.5874247 103.626277,22.5840361 103.626277,20.3105422 C103.626277,18.6860693 103.650987,15.5190512 103.599096,14.5167169 C103.518789,13.678238 103.176557,13.4618976 102.487152,13.2993223 C101.997323,13.1915672 101.502473,13.1099586 101.004561,13.0548193 C100.95267,12.892244 101.357912,12.1587349 101.491345,12" />
                        <path d="M124.608024,13.324111 C124.493908,13.3509511 124.351927,13.6219081 124.351927,13.7573867 C124.324062,14.7300203 124.294869,17.2708819 124.294869,19.0269905 C124.309867,19.0954048 124.365685,19.1486659 124.43685,19.162469 C124.805736,19.1893091 125.713352,19.2174273 126.480315,19.2174273 C127.559105,19.2174273 128.184087,19.0806706 128.52378,18.918352 C129.431397,18.4863544 129.850705,17.5405609 129.850705,16.514247 C129.850705,14.1625442 128.14826,13.2704308 125.623122,13.2704308 C125.28168,13.2662471 124.940333,13.284181 124.601389,13.324111 M131.042284,24.1355537 C131.042284,21.7570108 129.22705,20.4060597 125.905757,20.4060597 C125.765103,20.4060597 124.711524,20.3779415 124.459408,20.4328998 C124.373158,20.4597399 124.288235,20.51342 124.288235,20.5683783 C124.288235,22.2708067 124.260369,25.000827 124.345293,26.0820991 C124.40235,26.5409368 124.74337,27.1902113 125.169313,27.37937 C125.623122,27.6222089 126.643527,27.675889 127.353432,27.675889 C129.311973,27.675889 131.042284,26.6227351 131.042284,24.1355537 M119.480785,12 C119.736882,12 120.491902,12.0805203 122.421251,12.0805203 C124.237812,12.0805203 125.712026,12.0268401 127.472855,12.0268401 C129.658301,12.0268401 132.66644,12.784753 132.66644,15.9186527 C132.66644,17.4600406 131.530592,18.7023532 130.055052,19.2979475 C129.970128,19.3247876 129.970128,19.3784678 130.055052,19.4053079 C132.155574,19.9165476 134,21.1626945 134,23.5412375 C134,25.8648222 132.495267,27.3256898 130.311148,28.2433652 C128.976261,28.8121194 127.330874,29 125.656295,29 C124.378466,29 120.957653,28.8657996 119.056169,28.8926397 C118.85713,28.8121194 119.237958,27.9468461 119.407804,27.8113676 C119.843498,27.797767 120.275793,27.7325185 120.694922,27.6170965 C121.375634,27.4560559 121.456577,27.2438914 121.5415,26.2712578 C121.598558,25.4328246 121.598558,22.4369596 121.598558,20.2974212 C121.598558,17.3782422 121.626423,15.4061349 121.598558,14.4322231 C121.569365,13.6755883 121.285403,13.4314713 120.746672,13.2972709 C120.320729,13.2154725 119.612151,13.1349523 119.044227,13.054432 C118.902246,12.9189535 119.338804,12.1073603 119.480785,12" />
                        <path d="M22.249975,29 C22.1805791,28.8310463 22.1523418,28.6480307 22.1675894,28.4660315 C22.1622359,28.3423822 22.1902608,28.2195703 22.2487268,28.1104684 C22.5940746,28.0608571 22.9362568,27.9912913 23.2735536,27.9021209 C23.7453983,27.7848475 23.9239004,27.5278439 23.9513623,26.925258 C24.0287548,25.5030056 24.0337479,22.8344108 24.006286,20.9580356 L24.006286,20.9031417 C24.006286,20.7010321 24.006286,20.4265623 23.7566327,20.2319383 C23.3170141,19.9566712 22.8397905,19.7465545 22.3398502,19.6081434 C22.1164105,19.5420211 21.9928321,19.4247476 22.0003217,19.2875128 C22.0078113,19.1502779 22.1463689,18.9868436 22.4384633,18.9307021 C23.2111402,18.8508563 25.2383251,18.368039 26.0334709,18 C26.1155629,18.106581 26.1539493,18.2404145 26.1408218,18.374277 C26.1345805,18.4566179 26.1270909,18.5439492 26.1196013,18.6337757 C26.0971325,18.8995123 26.0721671,19.2001815 26.0721671,19.499603 C26.0821402,19.5737959 26.1333014,19.6359398 26.2042244,19.6600088 C26.2751474,19.6840778 26.3535909,19.6659176 26.4067026,19.6131337 C27.9220981,18.4254282 29.2777156,18.0012476 29.9767448,18.0012476 C31.1226535,18.0012476 32.0151641,18.5489395 32.7054555,19.6755132 C32.7382266,19.7307791 32.7972261,19.7652161 32.8614888,19.7665873 C32.9192366,19.7662862 32.97305,19.7372895 33.0050394,19.6892367 C34.3993531,18.6325281 35.7799359,18.0012476 36.7036531,18.0012476 C38.8893678,18.0012476 40.1987994,19.6368379 40.1987994,22.3752977 C40.1987994,23.1625269 40.1900616,24.1593513 40.1838202,25.0913009 C40.1763306,25.9072247 40.1713376,26.6732449 40.1713376,27.2034706 C40.1713376,27.3282296 40.3423501,27.6875354 40.6019895,27.7586481 C40.9215457,27.9145968 41.3834044,27.9944426 41.9663448,28.0942497 L41.9888136,28.0942497 C42.0325029,28.2514461 41.9401312,28.8615175 41.8515043,28.9862765 C41.7067054,28.9862765 41.5069827,28.9750482 41.2573294,28.9625723 C40.8029604,28.9401157 40.1813237,28.9076783 39.4573291,28.9076783 C38.0055951,28.9076783 37.2466491,28.9363729 36.5214062,28.9837813 C36.4664825,28.8028808 36.4477585,28.2177611 36.5139166,28.0967449 C36.8130666,28.044212 37.1089713,27.9746496 37.4001859,27.8883974 C37.8620445,27.7361914 37.995609,27.5265963 38.0243191,26.9127821 C38.0355535,26.4761257 38.1191874,22.636044 37.9706437,21.7240558 C37.8333343,20.7796303 37.1205742,19.673018 35.5627375,19.673018 C34.9847901,19.673018 34.0498385,19.9138029 33.1598245,20.588749 C33.1051645,20.6514864 33.0742447,20.731393 33.0724458,20.8145628 L33.0724458,20.8332766 C33.1773002,21.324827 33.1773002,21.8987184 33.1773002,22.7682885 C33.1773002,23.2673245 33.1773002,23.7875695 33.1710589,24.309062 C33.1710589,25.3682659 33.1585762,26.3675853 33.1773002,27.1223772 C33.1773002,27.6376318 33.4881186,27.7611432 33.7390201,27.8597028 C33.8750812,27.889645 33.9886734,27.9158444 34.0910313,27.9407962 C34.3007401,27.9919474 34.5179385,28.0443461 34.8399912,28.0954973 C34.8878487,28.3146652 34.8835731,28.5419997 34.8275086,28.7592152 C34.8144214,28.8411567 34.782363,28.9189097 34.7338886,28.9862765 C33.9262601,28.9588295 33.0974111,28.9338777 31.9028201,28.9338777 C31.5408228,28.9338777 30.9478962,28.9500964 30.4261208,28.9638199 C30.0029584,28.9750482 29.6022649,28.9862765 29.3750804,28.9875241 C29.3143029,28.8420087 29.287412,28.6845903 29.2964396,28.5271634 C29.2835025,28.3792363 29.3120295,28.2306304 29.3788252,28.0979925 L29.7021262,28.0468413 C29.9817379,27.9969377 30.2239016,27.9545197 30.4510861,27.8971305 C30.8467866,27.7723716 30.9953303,27.5565385 31.0240404,27.0537598 C31.101433,25.8797777 31.1613498,22.4975615 30.9953303,21.650448 C30.7132221,20.2918226 29.9392968,19.6019054 28.6947751,19.6019054 C27.9657874,19.6019054 27.045815,19.9524782 26.2931103,20.5163888 C26.1469836,20.6585934 26.0668947,20.8553154 26.0721671,21.0590904 C26.0721671,21.4620619 26.0721671,21.942384 26.0721671,22.4563911 C26.0721671,24.1543609 26.0609327,26.2690257 26.1021255,27.1847567 C26.1270909,27.4654644 26.2269522,27.7998185 26.7562172,27.9233299 C26.8710577,27.9570149 27.0720286,27.9894522 27.3042062,28.0281275 C27.4377707,28.0505841 27.5838179,28.0742883 27.7348581,28.1017353 C27.7828336,28.4009007 27.7584363,28.7071987 27.6637069,28.9950096 C27.4302811,28.9950096 27.1456763,28.9800386 26.8186305,28.9650675 C26.3193239,28.9438585 25.6951906,28.9151639 24.9874235,28.9151639 C24.1523332,28.9151639 23.570641,28.9438585 23.1050376,28.9650675 C22.7917227,28.9812862 22.5208489,28.9937621 22.249975,28.9950096" />
                        <path d="M49.9474745,19.0988999 C49.5016137,19.0892299 49.0629269,19.2113451 48.687199,19.4497166 C47.771867,20.0022225 47.3061933,21.1035671 47.3061933,22.7231915 C47.3061933,25.7558618 48.8374958,27.8742082 51.0278867,27.8742082 C51.6169645,27.8942261 52.1919682,27.6929906 52.6380334,27.3107012 C53.311905,26.7655295 53.6691679,25.6519613 53.6691679,24.0934548 C53.6691679,21.1060118 52.1735917,19.0988999 49.9474745,19.0988999 M50.3687983,29 C46.4105723,29 45,26.1189021 45,23.4236026 C45,21.5399489 45.7761227,20.0670074 47.3074252,19.0463385 C48.3790649,18.3870901 49.6095675,18.025708 50.8701982,18 C53.8909172,18 56,20.1562396 56,23.2426936 C56,25.34026 55.1573524,26.9965552 53.563221,28.0318924 C52.7981857,28.4976108 51.4689215,29 50.3687983,29" />
                        <path d="M90.9400829,19.1 C90.4942032,19.090183 90.0554737,19.2122964 89.6798074,19.4507778 C88.7657072,20.0032222 88.2988017,21.1044444 88.2988017,22.7238889 C88.2988017,25.7562222 89.8288722,27.8743333 92.020495,27.8743333 C92.6097366,27.8940114 93.1847601,27.6923549 93.6306417,27.3096667 C94.3045134,26.7657778 94.6617762,25.6523333 94.6617762,24.094 C94.6617762,21.1068889 93.1662,19.1 90.9400829,19.1 M91.3614067,29 C87.4031806,28.9987778 86,26.1216667 86,23.423 C86,21.5383333 86.7761227,20.0667778 88.3074252,19.0462222 C89.3784321,18.3866487 90.6086527,18.0252646 91.8689663,18 C94.8896853,18 97,20.156 97,23.2408889 C97,25.3406667 96.1561205,26.9955556 94.561989,28.0295556 C93.7969537,28.4964444 92.4676896,28.9987778 91.3675664,28.9987778" />
                        <path d="M77.4957323,19.048221 C76.2885788,19.048221 75.5081967,20.0478659 75.5081967,21.5959094 C75.5081967,23.1439528 76.1788375,24.9821746 78.0688253,24.9821746 C78.394391,24.9821746 78.9821162,24.8300547 79.2735401,24.493857 C79.7137244,24.0707336 80.0051483,23.1950856 80.0051483,22.2721398 C80.0051483,20.2536752 79.0674705,19.048221 77.4993903,19.048221 M77.3433139,29.7260138 C77.0026977,29.7228004 76.6669376,29.8108 76.3678363,29.9816774 C75.4118683,30.6208366 74.9692454,31.2663873 74.9692454,32.0052553 C74.9692454,32.7019388 75.2265276,33.2554506 75.7813304,33.7476032 C76.4519713,34.3432995 77.3567267,34.6334777 78.5480287,34.6334777 C80.8891749,34.6334777 81.940252,33.3129749 81.940252,32.0052553 C81.940252,31.0938144 81.5037257,30.4840565 80.6075057,30.1389106 C79.916136,29.8730204 78.7614144,29.7272921 77.3481913,29.7272921 M77.5042677,36 C76.0983606,36 75.0850833,35.6880903 74.219347,34.9901285 C73.3767782,34.3087849 73,33.2976351 73,32.5996733 C73.0088109,32.1494432 73.1724976,31.7177116 73.4609132,31.3839926 C73.7047825,31.0912577 74.2729982,30.5454158 75.5850156,29.594347 C75.6285762,29.5744939 75.6554886,29.5280315 75.6522018,29.4783547 C75.6489149,29.428678 75.6161414,29.3865559 75.5703834,29.3731979 C74.490042,28.939848 74.1644764,28.2227115 74.0657092,27.839216 C74.0657092,27.8251545 74.0596125,27.8034231 74.0547351,27.779135 C74.0242515,27.6270151 73.9949871,27.4851218 74.191302,27.3368369 C74.342501,27.2243449 74.5851511,27.0735033 74.8424333,26.9137135 C75.2081171,26.7021415 75.5585931,26.4628873 75.8910717,26.1978553 C75.9291854,26.1581211 75.9456815,26.1009551 75.9349681,26.0457354 C75.9272358,25.9907091 75.8945003,25.9430444 75.8471752,25.9179036 C74.2486113,25.3554435 73.4426229,24.1090832 73.4426229,22.2107805 C73.433074,21.0062179 73.9846937,19.8725255 74.9204715,19.1734962 C75.5642867,18.6404375 77.1787021,18 78.2236824,18 L78.2858691,18 C79.3613331,18.0268447 79.9673486,18.2633336 80.8074786,18.5893047 C81.2846223,18.7728195 81.7906908,18.8595805 82.29874,18.8449684 C83.1888633,18.8449684 83.5778349,18.5483986 83.911936,18.2058092 C83.9662965,18.3606441 83.995159,18.5240389 83.9972903,18.6890136 C84.0183257,19.0825285 83.9164458,19.4725092 83.7070857,19.7998722 C83.525403,20.0644841 83.103509,20.2575101 82.7047825,20.2575101 C82.6645441,20.2575101 82.625525,20.2575101 82.5828478,20.2511185 C82.3770859,20.2342419 82.1731016,20.1987429 81.9731743,20.1450181 L81.8731879,20.180811 C81.8414849,20.2306654 81.8622138,20.2843548 81.88782,20.353384 C81.8935046,20.3666869 81.8983915,20.3803489 81.9024522,20.3942902 C81.973737,20.7359081 82.0222219,21.0823196 82.0475545,21.4310063 C82.0475545,23.4213479 81.3000948,24.2880477 80.4904484,24.9297635 C79.7064684,25.5463952 78.7751217,25.9237673 77.7993497,26.020169 L77.7993497,26.020169 C77.7786208,26.020169 77.677415,26.0303956 77.4871968,26.048292 C77.3652621,26.0597969 77.206747,26.0738584 77.1835794,26.0738584 L77.1604118,26.0738584 C76.9848259,26.1262694 76.5251321,26.3550884 76.5251321,26.7794901 C76.5251321,27.1335843 76.7336404,27.5733258 77.7249695,27.6513032 C77.9249424,27.666643 78.1407668,27.6832611 78.366346,27.698601 C79.6759246,27.7944748 81.3098496,27.9133584 82.0792575,28.1869185 C83.12529,28.5727378 83.8173925,29.618328 83.796098,30.7806264 C83.796098,32.570272 82.5865059,34.244869 80.5575125,35.2700802 C79.6019465,35.7498555 78.555225,35.9967689 77.4957323,35.9923301" />
                        <path d="M70.9617099,27.9690191 C70.3875496,27.891511 69.9685347,27.8127726 69.4725579,27.579018 C69.3756612,27.4775959 69.3117431,27.3488525 69.2893152,27.2099318 C69.2380073,26.4028632 69.2380073,24.0616262 69.2380073,22.5262275 C69.2380073,21.2774857 69.0291107,20.1886814 68.5050367,19.4049883 C67.8771252,18.5204116 66.9902307,18 65.8394668,18 C64.8218593,18 63.4621988,18.7012638 62.3395321,19.6645789 C62.3126565,19.6904149 62.1404084,19.8552735 62.1452949,19.5993737 C62.1501813,19.3434739 62.1880515,18.8230623 62.2112622,18.492115 C62.2338667,18.3130903 62.1703362,18.1339425 62.0402357,18.0098423 C61.3072651,18.3789285 59.2488393,18.8710435 58.4877714,18.946091 C57.9307137,19.0543563 57.7914493,19.5932222 58.3839339,19.7789956 L58.3924852,19.7789956 C58.8666979,19.9108507 59.319358,20.1114347 59.7362647,20.3744548 C59.9720369,20.5565373 59.9451614,20.8173582 59.9451614,21.0252768 C59.9708153,22.7685941 59.9708153,25.4481602 59.8926318,26.9060508 C59.8669778,27.4781344 59.7093891,27.686053 59.2915959,27.7906274 L59.329466,27.7770943 C59.0113383,27.8575024 58.6886402,27.9183093 58.3631664,27.9591768 C58.2324533,28.088357 58.2324533,28.8437535 58.3631664,29 C58.6245926,29 59.9512694,28.9224919 61.0507254,28.9224919 C62.5655313,28.9224919 63.3498099,29 63.7382844,29 C63.895873,28.8179175 63.9484026,28.1154233 63.8433435,27.9591768 C63.4819893,27.9427196 63.1231303,27.8903837 62.7719847,27.8029303 C62.3541915,27.6995862 62.2491324,27.4904373 62.2247,27.0229281 C62.1721704,25.8000224 62.1721704,23.1979644 62.1721704,21.4288111 C62.1721704,20.9366961 62.3016619,20.7004809 62.4592506,20.5676099 C62.9808814,20.0988704 63.8433435,19.7876077 64.6019681,19.7876077 C65.3349387,19.7876077 65.8235858,20.0213623 66.1900711,20.3338553 C66.6087415,20.7084119 66.870696,21.229004 66.9230417,21.7905156 C67.0268792,22.7747456 67.0012253,24.7567386 67.0012253,26.4729896 C67.0012253,27.4104686 66.9230417,27.6454535 66.583432,27.7487977 C66.4258433,27.8263058 66.0080501,27.9050442 65.5120733,27.9567163 C65.3557062,28.1129628 65.4070142,28.8412929 65.5120733,28.9975394 C66.1912927,28.9975394 66.9780145,28.9200313 68.1238919,28.9200313 C69.561736,28.9200313 70.475506,28.9975394 70.8419914,28.9975394 C70.9983584,28.8154569 71.0496664,28.1363382 70.9458289,27.9567163" />
                        <path d="M16.6758883,14.730748 C14.6820681,6.13174252 9.97450946,3.30416465 9.46756171,2.22449755 C8.91096444,1.46042544 8.35175403,0.102217004 8.35175403,0.102217004 C8.3413015,0.0804958906 8.32692927,0.039609089 8.30994391,0 C8.25245499,0.760238967 8.22240396,1.05666828 7.48550054,1.82585123 C6.3448681,2.70363975 0.490144226,7.50528351 0.0197803354,17.2759514 C-0.424452228,26.3847641 6.75121024,31.8150425 7.72852188,32.5075627 L7.83827345,32.5829477 L7.83827345,32.5829477 C7.83827345,32.6276677 8.14662312,34.7550591 8.3609,37 L9.12001506,37 C9.2993457,35.4110648 9.56715395,33.8328759 9.9222468,32.2724636 L9.98104229,32.2341322 C10.4146751,31.9292369 10.8283595,31.5980873 11.2196672,31.2426273 L11.2640905,31.2030182 C14.9778076,27.8439056 17.0616462,23.1029219 16.9986102,18.1562953 C16.9871005,17.0077326 16.8791638,15.8620336 16.6758883,14.730748 Z M8.26552065,27.363492 C8.26552065,27.363492 8.26552065,14.5863665 8.70322039,14.5863665 C9.03900794,14.5863665 9.47540111,31.0688583 9.47540111,31.0688583 C8.87046088,30.9998619 8.26552065,28.3575523 8.26552065,27.363492 Z" />
                    </g>
                </g>
            </g>
        </svg>
    );
};
