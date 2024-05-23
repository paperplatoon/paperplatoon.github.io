//should add suitedTwoGappers at some point

const AA = [["Ah", "As"], ["Ah", "Ac"], ["Ah", "Ad"], ["As", "Ac"], ["As", "Ad"], ["Ac", "Ad"]]
const KK = [["Kh", "Ks"], ["Kh", "Kc"], ["Kh", "Kd"], ["Ks", "Kc"], ["Ks", "Kd"], ["Kc", "Kd"]]
const QQ = [["Qh", "Qs"], ["Qh", "Qc"], ["Qh", "Qd"], ["Qs", "Qc"], ["Qs", "Qd"], ["Qc", "Qd"]]
const JJ = [["Jh", "Js"], ["Jh", "Jc"], ["Jh", "Jd"], ["Js", "Jc"], ["Js", "Jd"], ["Jc", "Jd"]]
const TT = [["Th", "Ts"], ["Th", "Tc"], ["Th", "Td"], ["Ts", "Tc"], ["Ts", "Td"], ["Tc", "Td"]]
const _99 = [["9h", "9s"], ["9h", "9c"], ["9h", "9d"], ["9s", "9c"], ["9s", "9d"], ["9c", "9d"]]
const _88 = [["8h", "8s"], ["8h", "8c"], ["8h", "8d"], ["8s", "8c"], ["8s", "8d"], ["8c", "8d"]]
const _77 = [["7h", "7s"], ["7h", "7c"], ["7h", "7d"], ["7s", "7c"], ["7s", "7d"], ["7c", "7d"]]
const _66 = [["6h", "6s"], ["6h", "6c"], ["6h", "6d"], ["6s", "6c"], ["6s", "6d"], ["6c", "6d"]]
const _55 = [["5h", "5s"], ["5h", "5c"], ["5h", "5d"], ["5s", "5c"], ["5s", "5d"], ["5c", "5d"]]
const _44 = [["4h", "4s"], ["4h", "4c"], ["4h", "4d"], ["4s", "4c"], ["4s", "4d"], ["4c", "4d"]]
const _33 = [["3h", "3s"], ["3h", "3c"], ["3h", "3d"], ["3s", "3c"], ["3s", "3d"], ["3c", "3d"]]
const _22 = [["2h", "2s"], ["2h", "2c"], ["2h", "2d"], ["2s", "2c"], ["2s", "2d"], ["2c", "2d"]]
    

const AKs =  [["Ah", "Kh"], ["Ac", "Kc"], ["As", "Ks"], ["Ad", "Kd"]]
const AQs =  [["Ah", "Qh"], ["Ac", "Qc"], ["As", "Qs"], ["Ad", "Qd"]]
const AJs =  [["Ah", "Jh"], ["Ac", "Jc"], ["As", "Js"], ["Ad", "Jd"]]
const ATs = [["Ah", "Th"], ["Ac", "Tc"], ["As", "Ts"], ["Ad", "Td"]];
const A9s = [["Ah", "9h"], ["Ac", "9c"], ["As", "9s"], ["Ad", "9d"]];
const A8s = [["Ah", "8h"], ["Ac", "8c"], ["As", "8s"], ["Ad", "8d"]];
const A7s = [["Ah", "7h"], ["Ac", "7c"], ["As", "7s"], ["Ad", "7d"]];
const A6s = [["Ah", "6h"], ["Ac", "6c"], ["As", "6s"], ["Ad", "6d"]];
const A5s = [["Ah", "5h"], ["Ac", "5c"], ["As", "5s"], ["Ad", "5d"]];
const A4s = [["Ah", "4h"], ["Ac", "4c"], ["As", "4s"], ["Ad", "4d"]];
const A3s = [["Ah", "3h"], ["Ac", "3c"], ["As", "3s"], ["Ad", "3d"]];
const A2s = [["Ah", "2h"], ["Ac", "2c"], ["As", "2s"], ["Ad", "2d"]];

const KQs = [["Kh", "Qh"], ["Kc", "Qc"], ["Ks", "Qs"], ["Kd", "Qd"]];
const KJs = [["Kh", "Jh"], ["Kc", "Jc"], ["Ks", "Js"], ["Kd", "Jd"]];
const KTs = [["Kh", "Th"], ["Kc", "Tc"], ["Ks", "Ts"], ["Kd", "Td"]];
const QJs = [["Qh", "Jh"], ["Qc", "Jc"], ["Qs", "Js"], ["Qd", "Jd"]];
const JTs = [["Jh", "Th"], ["Jc", "Tc"], ["Js", "Ts"], ["Jd", "Td"]];

const K9s = [["Kh", "9h"], ["Kc", "9c"], ["Ks", "9s"], ["Kd", "9d"]];
const K8s = [["Kh", "8h"], ["Kc", "8c"], ["Ks", "8s"], ["Kd", "8d"]];
const K7s = [["Kh", "7h"], ["Kc", "7c"], ["Ks", "7s"], ["Kd", "7d"]];
const K6s = [["Kh", "6h"], ["Kc", "6c"], ["Ks", "6s"], ["Kd", "6d"]];
const K5s = [["Kh", "5h"], ["Kc", "5c"], ["Ks", "5s"], ["Kd", "5d"]];
const K4s = [["Kh", "4h"], ["Kc", "4c"], ["Ks", "4s"], ["Kd", "4d"]];
const K3s = [["Kh", "3h"], ["Kc", "3c"], ["Ks", "3s"], ["Kd", "3d"]];
const K2s = [["Kh", "2h"], ["Kc", "2c"], ["Ks", "2s"], ["Kd", "2d"]];

const QTs = [["Qh", "Th"], ["Qc", "Tc"], ["Qs", "Ts"], ["Qd", "Td"]];
const Q9s = [["Qh", "9h"], ["Qc", "9c"], ["Qs", "9s"], ["Qd", "9d"]];
const Q8s = [["Qh", "8h"], ["Qc", "8c"], ["Qs", "8s"], ["Qd", "8d"]];
const Q7s = [["Qh", "7h"], ["Qc", "7c"], ["Qs", "7s"], ["Qd", "7d"]];
const Q6s = [["Qh", "6h"], ["Qc", "6c"], ["Qs", "6s"], ["Qd", "6d"]];
const Q5s = [["Qh", "5h"], ["Qc", "5c"], ["Qs", "5s"], ["Qd", "5d"]];
const Q4s = [["Qh", "4h"], ["Qc", "4c"], ["Qs", "4s"], ["Qd", "4d"]];
const Q3s = [["Qh", "3h"], ["Qc", "3c"], ["Qs", "3s"], ["Qd", "3d"]];
const Q2s = [["Qh", "2h"], ["Qc", "2c"], ["Qs", "2s"], ["Qd", "2d"]];

const J9s = [["Jh", "9h"], ["Jc", "9c"], ["Js", "9s"], ["Jd", "9d"]];
const J8s = [["Jh", "8h"], ["Jc", "8c"], ["Js", "8s"], ["Jd", "8d"]];
const J7s = [["Jh", "7h"], ["Jc", "7c"], ["Js", "7s"], ["Jd", "7d"]];
const J6s = [["Jh", "6h"], ["Jc", "6c"], ["Js", "6s"], ["Jd", "6d"]];
const J5s = [["Jh", "5h"], ["Jc", "5c"], ["Js", "5s"], ["Jd", "5d"]];
const J4s = [["Jh", "4h"], ["Jc", "4c"], ["Js", "4s"], ["Jd", "4d"]];
const J3s = [["Jh", "3h"], ["Jc", "3c"], ["Js", "3s"], ["Jd", "3d"]];
const J2s = [["Jh", "2h"], ["Jc", "2c"], ["Js", "2s"], ["Jd", "2d"]];

const T9s = [["Th", "9h"], ["Tc", "9c"], ["Ts", "9s"], ["Td", "9d"]];
const T8s = [["Th", "8h"], ["Tc", "8c"], ["Ts", "8s"], ["Td", "8d"]];
const T7s = [["Th", "7h"], ["Tc", "7c"], ["Ts", "7s"], ["Td", "7d"]];
const T6s = [["Th", "6h"], ["Tc", "6c"], ["Ts", "6s"], ["Td", "6d"]];
const T5s = [["Th", "5h"], ["Tc", "5c"], ["Ts", "5s"], ["Td", "5d"]];
const T4s = [["Th", "4h"], ["Tc", "4c"], ["Ts", "4s"], ["Td", "4d"]];
const T3s = [["Th", "3h"], ["Tc", "3c"], ["Ts", "3s"], ["Td", "3d"]];
const T2s = [["Th", "2h"], ["Tc", "2c"], ["Ts", "2s"], ["Td", "2d"]];

const _98s = [["9h", "8h"], ["9c", "8c"], ["9s", "8s"], ["9d", "8d"]];
const _87s = [["8h", "7h"], ["8c", "7c"], ["8s", "7s"], ["8d", "7d"]];
const _76s = [["7h", "6h"], ["7c", "6c"], ["7s", "6s"], ["7d", "6d"]];
const _65s = [["6h", "5h"], ["6c", "5c"], ["6s", "5s"], ["6d", "5d"]];
const _54s = [["5h", "4h"], ["5c", "4c"], ["5s", "4s"], ["5d", "4d"]];
const _43s = [["4h", "3h"], ["4c", "3c"], ["4s", "3s"], ["4d", "3d"]];
const _32s = [["3h", "2h"], ["3c", "2c"], ["3s", "2s"], ["3d", "2d"]];

const _97s = [["9h", "7h"], ["9c", "7c"], ["9s", "7s"], ["9d", "7d"]];
const _86s = [["8h", "6h"], ["8c", "6c"], ["8s", "6s"], ["8d", "6d"]];
const _75s = [["7h", "5h"], ["7c", "5c"], ["7s", "5s"], ["7d", "5d"]];
const _64s = [["6h", "4h"], ["6c", "4c"], ["6s", "4s"], ["6d", "4d"]];
const _53s = [["5h", "3h"], ["5c", "3c"], ["5s", "3s"], ["5d", "3d"]];
const _42s = [["4h", "2h"], ["4c", "2c"], ["4s", "2s"], ["4d", "2d"]];

const AKo = [["Ah", "Kc"],["Ah", "Kd"],["Ah", "Ks"],["Ac", "Kh"], ["Ac", "Kd"],["Ac", "Ks"],
            ["Ad", "Kh"],["Ad", "Kc"],["Ad", "Ks"],["As", "Kh"],["As", "Kc"],["As", "Kd"]];

const AQo = [["Ah", "Qc"],["Ah", "Qd"],["Ah", "Qs"],["Ac", "Qh"], ["Ac", "Qd"],["Ac", "Qs"],
            ["Ad", "Qh"],["Ad", "Qc"],["Ad", "Qs"],["As", "Qh"],["As", "Qc"],["As", "Qd"]];

const AJo = [["Ah", "Jc"], ["Ah", "Jd"], ["Ah", "Js"], ["Ac", "Jh"], ["Ac", "Jd"], ["Ac", "Js"],
            ["Ad", "Jh"], ["Ad", "Jc"], ["Ad", "Js"], ["As", "Jh"], ["As", "Jc"], ["As", "Jd"]];

const ATo = [["Ah", "Tc"], ["Ah", "Td"], ["Ah", "Ts"], ["Ac", "Th"], ["Ac", "Td"], ["Ac", "Ts"],
            ["Ad", "Th"], ["Ad", "Tc"], ["Ad", "Ts"], ["As", "Th"], ["As", "Tc"], ["As", "Td"]];

const A9o = [["Ah", "9c"], ["Ah", "9d"], ["Ah", "9s"], ["Ac", "9h"], ["Ac", "9d"], ["Ac", "9s"],
            ["Ad", "9h"], ["Ad", "9c"], ["Ad", "9s"], ["As", "9h"], ["As", "9c"], ["As", "9d"]];

const A8o = [["Ah", "8c"], ["Ah", "8d"], ["Ah", "8s"], ["Ac", "8h"], ["Ac", "8d"], ["Ac", "8s"],
            ["Ad", "8h"], ["Ad", "8c"], ["Ad", "8s"], ["As", "8h"], ["As", "8c"], ["As", "8d"]];

const A7o = [["Ah", "7c"], ["Ah", "7d"], ["Ah", "7s"], ["Ac", "7h"], ["Ac", "7d"], ["Ac", "7s"],
            ["Ad", "7h"], ["Ad", "7c"], ["Ad", "7s"], ["As", "7h"], ["As", "7c"], ["As", "7d"]];

const A6o = [["Ah", "6c"], ["Ah", "6d"], ["Ah", "6s"], ["Ac", "6h"], ["Ac", "6d"], ["Ac", "6s"],
            ["Ad", "6h"], ["Ad", "6c"], ["Ad", "6s"], ["As", "6h"], ["As", "6c"], ["As", "6d"]];

const A5o = [["Ah", "5c"], ["Ah", "5d"], ["Ah", "5s"], ["Ac", "5h"], ["Ac", "5d"], ["Ac", "5s"],
            ["Ad", "5h"], ["Ad", "5c"], ["Ad", "5s"], ["As", "5h"], ["As", "5c"], ["As", "5d"]];

const A4o = [["Ah", "4c"], ["Ah", "4d"], ["Ah", "4s"], ["Ac", "4h"], ["Ac", "4d"], ["Ac", "4s"],
            ["Ad", "4h"], ["Ad", "4c"], ["Ad", "4s"], ["As", "4h"], ["As", "4c"], ["As", "4d"]];

const A3o = [["Ah", "3c"], ["Ah", "3d"], ["Ah", "3s"], ["Ac", "3h"], ["Ac", "3d"], ["Ac", "3s"],
            ["Ad", "3h"], ["Ad", "3c"], ["Ad", "3s"], ["As", "3h"], ["As", "3c"], ["As", "3d"]];

const A2o = [["Ah", "2c"], ["Ah", "2d"], ["Ah", "2s"], ["Ac", "2h"], ["Ac", "2d"], ["Ac", "2s"],
            ["Ad", "2h"], ["Ad", "2c"], ["Ad", "2s"], ["As", "2h"], ["As", "2c"], ["As", "2d"]];

const KQo = [["Kh", "Qc"], ["Kh", "Qd"], ["Kh", "Qs"], ["Kc", "Qh"], ["Kc", "Qd"], ["Kc", "Qs"],
            ["Kd", "Qh"], ["Kd", "Qc"], ["Kd", "Qs"], ["Ks", "Qh"], ["Ks", "Qc"], ["Ks", "Qd"]];

const KJo = [["Kh", "Jc"], ["Kh", "Jd"], ["Kh", "Js"], ["Kc", "Jh"], ["Kc", "Jd"], ["Kc", "Js"],
            ["Kd", "Jh"], ["Kd", "Jc"], ["Kd", "Js"], ["Ks", "Jh"], ["Ks", "Jc"], ["Ks", "Jd"]];

const KTo = [["Kh", "Tc"], ["Kh", "Td"], ["Kh", "Ts"], ["Kc", "Th"], ["Kc", "Td"], ["Kc", "Ts"],
            ["Kd", "Th"], ["Kd", "Tc"], ["Kd", "Ts"], ["Ks", "Th"], ["Ks", "Tc"], ["Ks", "Td"]];

const K9o = [["Kh", "9c"], ["Kh", "9d"], ["Kh", "9s"], ["Kc", "9h"], ["Kc", "9d"], ["Kc", "9s"],
            ["Kd", "9h"], ["Kd", "9c"], ["Kd", "9s"], ["Ks", "9h"], ["Ks", "9c"], ["Ks", "9d"]];

const K8o = [["Kh", "8c"], ["Kh", "8d"], ["Kh", "8s"], ["Kc", "8h"], ["Kc", "8d"], ["Kc", "8s"],
            ["Kd", "8h"], ["Kd", "8c"], ["Kd", "8s"], ["Ks", "8h"], ["Ks", "8c"], ["Ks", "8d"]];

const K7o = [["Kh", "7c"], ["Kh", "7d"], ["Kh", "7s"], ["Kc", "7h"], ["Kc", "7d"], ["Kc", "7s"],
            ["Kd", "7h"], ["Kd", "7c"], ["Kd", "7s"], ["Ks", "7h"], ["Ks", "7c"], ["Ks", "7d"]];

const K6o = [["Kh", "6c"], ["Kh", "6d"], ["Kh", "6s"], ["Kc", "6h"], ["Kc", "6d"], ["Kc", "6s"],
            ["Kd", "6h"], ["Kd", "6c"], ["Kd", "6s"], ["Ks", "6h"], ["Ks", "6c"], ["Ks", "6d"]];

const K5o = [["Kh", "5c"], ["Kh", "5d"], ["Kh", "5s"], ["Kc", "5h"], ["Kc", "5d"], ["Kc", "5s"],
            ["Kd", "5h"], ["Kd", "5c"], ["Kd", "5s"], ["Ks", "5h"], ["Ks", "5c"], ["Ks", "5d"]];

const K4o = [["Kh", "4c"], ["Kh", "4d"], ["Kh", "4s"], ["Kc", "4h"], ["Kc", "4d"], ["Kc", "4s"],
            ["Kd", "4h"], ["Kd", "4c"], ["Kd", "4s"], ["Ks", "4h"], ["Ks", "4c"], ["Ks", "4d"]];

const K3o = [["Kh", "3c"], ["Kh", "3d"], ["Kh", "3s"], ["Kc", "3h"], ["Kc", "3d"], ["Kc", "3s"],
            ["Kd", "3h"], ["Kd", "3c"], ["Kd", "3s"], ["Ks", "3h"], ["Ks", "3c"], ["Ks", "3d"]];

const K2o = [["Kh", "2c"], ["Kh", "2d"], ["Kh", "2s"], ["Kc", "2h"], ["Kc", "2d"], ["Kc", "2s"],
            ["Kd", "2h"], ["Kd", "2c"], ["Kd", "2s"], ["Ks", "2h"], ["Ks", "2c"], ["Ks", "2d"]];

const QJo = [["Qh", "Jc"],["Qh", "Jd"],["Qh", "Js"],["Qc", "Jh"],["Qc", "Jd"],["Qc", "Js"],
            ["Qd", "Jh"],["Qd", "Jc"],["Qd", "Js"],["Qs", "Jh"],["Qs", "Jc"],["Qs", "Jd"]];

const QTo = [["Qh", "Tc"],["Qh", "Td"],["Qh", "Ts"],["Qc", "Th"],["Qc", "Td"],["Qc", "Ts"],
            ["Qd", "Th"],["Qd", "Tc"],["Qd", "Ts"],["Qs", "Th"],["Qs", "Tc"],["Qs", "Td"]];

const Q9o = [["Qh", "9c"],["Qh", "9d"],["Qh", "9s"],["Qc", "9h"],["Qc", "9d"],["Qc", "9s"],
            ["Qd", "9h"],["Qd", "9c"],["Qd", "9s"],["Qs", "9h"],["Qs", "9c"],["Qs", "9d"]];

const JTo = [["Jh", "Tc"],["Jh", "Td"],["Jh", "Ts"],["Jc", "Th"],["Jc", "Td"],["Jc", "Ts"],
            ["Jd", "Th"],["Jd", "Tc"],["Jd", "Ts"],["Js", "Th"],["Js", "Tc"],["Js", "Td"]];

const T9o = [["Th", "9c"],["Th", "9d"],["Th", "9s"],["Tc", "9h"],["Tc", "9d"],["Tc", "9s"],
            ["Td", "9h"],["Td", "9c"],["Td", "9s"],["Ts", "9h"],["Ts", "9c"],["Ts", "9d"]];

const _98o = [["8h", "9c"],["8h", "9d"],["8h", "9s"],["8c", "9h"],["8c", "9d"],["8c", "9s"],
            ["8d", "9h"],["8d", "9c"],["8d", "9s"],["8s", "9h"],["8s", "9c"],["8s", "9d"]];

const _87o = [["8h", "7c"],["8h", "7d"],["8h", "7s"],["8c", "7h"],["8c", "7d"],["8c", "7s"],
            ["8d", "7h"],["8d", "7c"],["8d", "7s"],["8s", "7h"],["8s", "7c"],["8s", "7d"]];

const _76o = [["6h", "7c"],["6h", "7d"],["6h", "7s"],["6c", "7h"],["6c", "7d"],["6c", "7s"],
            ["6d", "7h"],["6d", "7c"],["6d", "7s"],["6s", "7h"],["6s", "7c"],["6s", "7d"]];

const _65o = [["6h", "5c"],["6h", "5d"],["6h", "5s"],["6c", "5h"],["6c", "5d"],["6c", "5s"],
            ["6d", "5h"],["6d", "5c"],["6d", "5s"],["6s", "5h"],["6s", "5c"],["6s", "5d"]];

const _54o = [["4h", "5c"],["4h", "5d"],["4h", "5s"],["4c", "5h"],["4c", "5d"],["4c", "5s"],
            ["4d", "5h"],["4d", "5c"],["4d", "5s"],["4s", "5h"],["4s", "5c"],["4s", "5d"]];

const _43o = [["4h", "3c"],["4h", "3d"],["4h", "3s"],["4c", "3h"],["4c", "3d"],["4c", "3s"],
            ["4d", "3h"],["4d", "3c"],["4d", "3s"],["4s", "3h"],["4s", "3c"],["4s", "3d"]];

const _32o = [["2h", "3c"],["2h", "3d"],["2h", "3s"],["2c", "3h"],["2c", "3d"],["2c", "3s"],
            ["2d", "3h"],["2d", "3c"],["2d", "3s"],["2s", "3h"],["2s", "3c"],["2s", "3d"]];

const AceXSuited = AKs.concat(AQs, AJs, ATs, A9s, A8s, A7s, A6s, A5s, A4s, A3s, A2s)

const TierOne = AA.concat(KK, QQ, JJ, AKs)
const TierTwo = TT.concat(AQs, AJs, ATs, KQs, AKo)
const TierThree = _99.concat(AQo, AJo, ATo, A9s, A8s, A7s, A6s, A5s, A4s, A3s, A2s, QJs, KJs)
const TierFour = _88.concat(_77, KQo, KTs, K9s, QTs, JTs, _98s)
const TierFive = _66.concat(_55, A9o, A8o, KJo, KTo, QJo, QTo, Q9s, K9s, K8s, K7s, _87s, _76s, _65s, _54s, J9s)
const TierSix = _44.concat(_33, _22, JTo, Q8s, Q7s, Q6s, Q5s, Q4s, Q3s, Q2s, K6s, K5s, K4s, K3s, K2s, A7o, A6o, A5o, A4o, A3o, A2o, _43s, _32s, _86s, J8s, T8s, _97s)
const TierSeven = J7s.concat(J6s, J5s, _75s, _64s, _53s, _42s, K9o, K8o, K7o, K6o, T9o, Q9o, _98o, _87o, _76o)