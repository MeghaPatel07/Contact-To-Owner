import React from 'react'

const BradCrume = ({Title}) => {
  return (
    <React.Fragment>
     <section className="page-title about-page-3 p_relative centred">
  <div className="bg-layer p_absolute l_0 parallax_none parallax-bg" data-parallax="{&quot;y&quot;: 100}" />
  <div className="auto-container">
    <div className="content-box">
      <h1 className="d_block fs_60 lh_70 fw_bold mb_10">{Title}</h1>
      <ul className="bread-crumb p_relative d_block mb_8 clearfix">
        <li className="p_relative d_iblock fs_16 lh_25 fw_sbold font_family_inter mr_20"><a href="/">Home</a></li>
        
        <li className="current p_relative d_iblock fs_16 lh_25 fw_sbold font_family_inter">{Title}</li>
      </ul>
    </div>
  </div>
</section>

    </React.Fragment>
  )
}

export default BradCrume