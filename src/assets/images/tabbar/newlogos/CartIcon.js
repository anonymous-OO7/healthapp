import React from 'react';


import Svg , {Path,G,Defs, ClipPath} from 'react-native-svg';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const CartIcon = (props) =>{



    return(


      <Svg
      width={responsiveWidth(6)}
      height={responsiveHeight(7)}
      viewBox="0 0 25 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.906 32.223h1.465a3.38 3.38 0 01-.469 1.494 2.79 2.79 0 01-1.119 1.025c-.48.25-1.064.375-1.752.375a3.47 3.47 0 01-1.424-.281 3.12 3.12 0 01-1.084-.809 3.657 3.657 0 01-.691-1.271 5.525 5.525 0 01-.234-1.664v-.71a5.4 5.4 0 01.24-1.663c.164-.496.398-.92.703-1.272a3.04 3.04 0 011.096-.814c.43-.188.912-.281 1.447-.281.68 0 1.254.125 1.723.375.468.25.832.595 1.09 1.037.261.441.421.947.48 1.517H6.912a2.71 2.71 0 00-.258-.943 1.33 1.33 0 00-.574-.598c-.254-.14-.586-.21-.996-.21-.336 0-.629.062-.879.187a1.66 1.66 0 00-.627.55 2.654 2.654 0 00-.38.897 5.338 5.338 0 00-.124 1.207v.72c0 .43.037.821.112 1.173.078.347.195.646.351.896.16.25.363.444.61.58.246.137.54.205.884.205.418 0 .756-.066 1.014-.199.262-.133.459-.326.592-.58.136-.258.226-.572.27-.943zm6.235 1.505v-3.023c0-.226-.041-.422-.123-.586a.862.862 0 00-.375-.38 1.282 1.282 0 00-.622-.136c-.23 0-.43.04-.597.118a.967.967 0 00-.393.316.764.764 0 00-.14.451H9.484c0-.25.06-.492.182-.726.121-.235.297-.444.527-.627.23-.184.506-.328.827-.434.32-.105.68-.158 1.078-.158.476 0 .898.08 1.265.24.371.16.662.402.873.727.215.32.323.722.323 1.207v2.818c0 .29.02.549.058.78.043.226.104.423.182.591V35h-1.447a2.498 2.498 0 01-.159-.58 4.731 4.731 0 01-.052-.692zm.205-2.584l.011.874h-1.013c-.262 0-.492.025-.692.076-.199.047-.365.117-.498.21a.915.915 0 00-.398.792c0 .168.039.322.117.463a.823.823 0 00.34.322c.152.078.336.117.55.117.29 0 .542-.058.757-.176.218-.12.39-.267.515-.44.125-.175.192-.341.2-.497l.456.627c-.046.16-.127.332-.24.515-.113.184-.261.36-.445.528a2.216 2.216 0 01-1.518.563c-.414 0-.783-.083-1.107-.247a1.97 1.97 0 01-.762-.674 1.748 1.748 0 01-.275-.967c0-.335.062-.632.187-.89.13-.262.317-.48.563-.656a2.72 2.72 0 01.914-.399c.36-.094.77-.14 1.23-.14h1.108zm4.107-1.277V35h-1.412v-6.34h1.348l.064 1.207zm1.94-1.248l-.012 1.313a3.677 3.677 0 00-.574-.047 1.78 1.78 0 00-.639.105 1.204 1.204 0 00-.744.75c-.067.18-.106.381-.117.604l-.323.023c0-.398.04-.767.118-1.107.078-.34.195-.639.351-.897.16-.258.36-.459.598-.603.242-.145.521-.217.838-.217.086 0 .177.008.275.023.102.016.178.034.229.053zm4.084.041v1.031h-3.575v-1.03h3.575zm-2.543-1.553h1.412v6.141c0 .195.027.346.082.451.058.102.138.17.24.205.102.035.22.053.357.053.098 0 .192-.006.282-.017.09-.012.162-.024.216-.036l.006 1.078a3.604 3.604 0 01-.41.094 3.016 3.016 0 01-.527.041c-.324 0-.611-.056-.861-.17a1.269 1.269 0 01-.587-.568c-.14-.262-.21-.61-.21-1.043v-6.229zM4.736 22.286c0 .225.04.448.119.656.079.208.194.397.339.556.145.16.317.285.507.371.19.087.393.131.598.131.415 0 .813-.18 1.106-.502.145-.16.26-.348.339-.556.079-.208.119-.431.119-.656 0-.455-.165-.891-.458-1.213a1.497 1.497 0 00-1.106-.502c-.414 0-.812.181-1.105.502a1.802 1.802 0 00-.458 1.213zm14.072 0c0 .225.04.448.119.656.078.208.194.397.339.556.145.16.317.285.507.371.19.087.393.131.598.131.415 0 .813-.18 1.106-.502.145-.16.26-.348.339-.556.078-.208.119-.431.119-.656 0-.455-.165-.891-.458-1.213a1.497 1.497 0 00-1.106-.502c-.415 0-.812.181-1.105.502a1.802 1.802 0 00-.458 1.213zM0 .857a.9.9 0 00.229.606c.147.161.345.251.553.251h1.624l.971 4.553 1.359 7.447c0 .062.027.115.033.175l-.796 3.926a.935.935 0 00.001.38.891.891 0 00.151.343c.074.1.167.18.272.236a.721.721 0 00.339.083h17.737c.207 0 .406-.09.552-.25a.901.901 0 00.23-.607.901.901 0 00-.23-.606.749.749 0 00-.552-.251H5.712l.358-1.766c.078.014.148.052.23.052H20.55c.863 0 1.384-.187 1.8-1.286l2.539-8.54c.44-1.532-.527-2.174-1.392-2.174H4.736c-.122 0-.228.046-.342.075L3.787.662A.87.87 0 003.51.185.74.74 0 003.025 0H.782a.749.749 0 00-.553.251A.9.9 0 000 .857zm4.767 4.286h18.614l-2.495 8.398c-.03.074-.055.127-.074.163-.052.005-.133.01-.261.01H6.299v-.17l-.03-.166-1.502-8.235z"
        fill={props.fill}
      />
    </Svg>

    )
}; 

export default CartIcon;

