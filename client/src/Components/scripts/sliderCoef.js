export function computeTrackFeatureCoefficient( features, average, sliderValues ){
    const dCoef = sliderValues.danceability;
    const eCoef = sliderValues.energy;
    const mCoef = sliderValues.mood;
    let coef = (dCoef*features.danceability)/average.avD +
               (eCoef*features.energy)/average.avE + 
               (mCoef*features.valence)/average.avM;;

    return coef;
}