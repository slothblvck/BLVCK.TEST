import React, { useState } from 'react'
import TitlePage from '../../components/shared/TitlePage'
import TopSideInfo from '../../components/Dashboard/TopSideInfo'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { BACKEND_URL } from '../../hooks/WalletLogin';
import { useContext } from 'react';
import { WalletConnectContext } from '../../hooks/WalletLogin';
import exportToCsv from '../../hooks/DownloadCSV';
import { useEffect } from 'react';

const Snapshot = () => {
    const [numberType, setnumberType] = useState("More than");
    const [number, setnumber] = useState(0);
    const [snapshotProgress, setsnapshotProgress] = useState(false);
    const [trait, settrait] = useState("Accessories");
    const [traitType, settraitType] = useState("No Accessories");
    const [allSnapshots, setallSnapshots] = useState([]);
    const { walletAddress } = useContext(WalletConnectContext)

    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${
                JSON.parse(localStorage.getItem('accessToken')).accessToken
            }`,
        },
    }

    useEffect(async () => {
        await axios.post(`${BACKEND_URL}/auth/getSnapshots`, { owner: walletAddress }, config).then((res) => {
            setallSnapshots(res.data.snapshots)
        })
    }, [])

    const getSnapshot = async (e, id) => {
        await axios.post(`${BACKEND_URL}/auth/getSnapshot`, { owner: walletAddress, id }, config).then((res) => {
            exportToCsv(e, 'Snapshot', res.data.snapshot[0].data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const nftNumberSnapshot = async (e) => {
        setsnapshotProgress(true)
        await axios.post(`${BACKEND_URL}/auth/snapshot`, { snapshotType: 'Number', value: number, sortType: numberType, owner: walletAddress }, config).then((res) => {
            exportToCsv(e, 'Snapshot', res.data.finalizedArray)
        }).catch((error) => {
            console.log(error)
        })
        setsnapshotProgress(false)
    }

    const nftTraitSnapshot = async (e) => {
        setsnapshotProgress(true)
        await axios.post(`${BACKEND_URL}/auth/snapshot`, { snapshotType: 'Trait', value: traitType, sortType: trait, owner: walletAddress }, config).then((res) => {
            exportToCsv(e, 'Snapshot', res.data.finalizedArray)
        }).catch((error) => {
            console.log(error)
        })
        setsnapshotProgress(false)
    }

    return (
        <div className='w-full h-full flex flex-col screen2:pb-16'>
            {/* Top */}
            <div className='flex items-center justify-between w-full screen2:hidden'>
                    <div className='pl-12'>
                        <TitlePage heading={'Snapshot'} />
                    </div>
                    <div className='min-w-[330px] border-borderLine'>
                        <TopSideInfo />
                    </div>
                </div>
                <div style={{ overflow: 'auto' }}>
                <div className='flex flex-col p-6 px-12 screen3:px-4 gap-y-4'>
                    <div style={{ fontSize: '24px', fontWeight: 600 }}>
                        Snapshot By NFT Number
                    </div>
                </div>
                <div style={{ display: 'flex', marginLeft: '5rem', alignItems: 'center', gap: '30px' }}>
                    <Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={numberType}
                        onChange={(e) => setnumberType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="More than">More than</MenuItem>
                        <MenuItem value={"Less than"}>Less than</MenuItem>
                        <MenuItem value={"Equal to"}>Equal to</MenuItem>
                    </Select>
                    <TextField type='number' id="outlined-basic" label="Number" variant="outlined" onChange={(e) => setnumber(e.target.value)} />
                    <button id='apiMessage' disabled={snapshotProgress} onClick={(e) => {
                        nftNumberSnapshot(e)
                    }} className='takeSnapshot'>{!snapshotProgress ? 'Take Snapshot' : 'Taking...'}</button>
                </div>
                <div style={{ overflow: 'auto', marginTop: '40px' }} className='flex flex-col p-6 px-12 screen3:px-4 gap-y-4'>
                    <div style={{ fontSize: '24px', fontWeight: 600 }}>
                        Snapshot By NFT Trait Type
                    </div>
                </div>
                <div style={{ display: 'flex', marginLeft: '5rem', alignItems: 'center', gap: '30px' }}>
                    <Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={trait}
                        onChange={(e) => {
                            if (e.target.value == "Accessories") {
                                settrait(e.target.value)
                                settraitType('No Accessories')
                            } else if (e.target.value == "Back 1") {
                                settrait(e.target.value)
                                settraitType('No Back 1')
                            } else if (e.target.value == "Back 2") {
                                settrait(e.target.value)
                                settraitType('No Back 2')
                            } else if (e.target.value == "Background") {
                                settrait(e.target.value)
                                settraitType('Black')
                            } else if (e.target.value == "Eyes") {
                                settrait(e.target.value)
                                settraitType('Green')
                            } else if (e.target.value == "Facial Hairs") {
                                settrait(e.target.value)
                                settraitType('No Beard')
                            } else if (e.target.value == "Gender") {
                                settrait(e.target.value)
                                settraitType('Female')
                            } else if (e.target.value == "Hair Styles") {
                                settrait(e.target.value)
                                settraitType('H8 Green')
                            } else if (e.target.value == "Hair Styles (Back)") {
                                settrait(e.target.value)
                                settraitType('No Hair Style Back')
                            } else if (e.target.value == "Hair Styles (Front)") {
                                settrait(e.target.value)
                                settraitType('No Hair Style Front')
                            } else if (e.target.value == "Legendary") {
                                settrait(e.target.value)
                                settraitType('Blvck Alpha')
                            } else if (e.target.value == "Outfits") {
                                settrait(e.target.value)
                                settraitType('Shirt 01')
                            } else if (e.target.value == "Skins") {
                                settrait(e.target.value)
                                settraitType('Mixed')
                            } else if (e.target.value == "Tattoo Zone A") {
                                settrait(e.target.value)
                                settraitType('No Tatoo')
                            } else if (e.target.value == "Tattoo Zone B") {
                                settrait(e.target.value)
                                settraitType('No Tatoo')
                            } else if (e.target.value == "Tattoo Zone C") {
                                settrait(e.target.value)
                                settraitType('No Tatoo')
                            } else if (e.target.value == "Tattoo Zone D") {
                                settrait(e.target.value)
                                settraitType('No Tatoo')
                            } else if (e.target.value == "Tattoo Zone E") {
                                settrait(e.target.value)
                                settraitType('No Tatoo')
                            }
                        }}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="Accessories">Accessories</MenuItem>
                        <MenuItem value={"Back 1"}>Back 1</MenuItem>
                        <MenuItem value={"Back 2"}>Back 2</MenuItem>
                        <MenuItem value="Background">Background</MenuItem>
                        <MenuItem value={"Eyes"}>Eyes</MenuItem>
                        <MenuItem value={"Facial Hairs"}>Facial Hairs</MenuItem>
                        <MenuItem value="Gender">Gender</MenuItem>
                        <MenuItem value={"Hair Styles"}>Hair Styles</MenuItem>
                        <MenuItem value={"Hair Styles (Back)"}>Hair Styles (Back)</MenuItem>
                        <MenuItem value="Hair Styles (Front)">Hair Styles (Front)</MenuItem>
                        <MenuItem value={"Legendary"}>Legendary</MenuItem>
                        <MenuItem value={"Outfits"}>Outfits</MenuItem>
                        <MenuItem value="Skins">Skins</MenuItem>
                        <MenuItem value={"Tattoo Zone A"}>Tattoo Zone A</MenuItem>
                        <MenuItem value={"Tattoo Zone B"}>Tattoo Zone B</MenuItem>
                        <MenuItem value={"Tattoo Zone C"}>Tattoo Zone C</MenuItem>
                        <MenuItem value={"Tattoo Zone D"}>Tattoo Zone D</MenuItem>
                        <MenuItem value={"Tattoo Zone E"}>Tattoo Zone E</MenuItem>
                    </Select>
                        { trait == "Accessories" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                            <MenuItem value="No Accessories">No Accessories</MenuItem>
                            <MenuItem value={"Mask 02"}>Mask 02</MenuItem>
                            <MenuItem value={"Tiger"}>Tiger</MenuItem>
                            <MenuItem value="Mask 03">Mask 03</MenuItem>
                            <MenuItem value={"Skull Mask"}>Skull Mask</MenuItem>
                            <MenuItem value={"Sunglasses"}>Sunglasses</MenuItem>
                            <MenuItem value="Gas Mask">Gas Mask</MenuItem>
                            <MenuItem value={"Butterfly"}>Butterfly</MenuItem>
                            <MenuItem value={"Venetian Mask"}>Venetian Mask</MenuItem>
                            <MenuItem value="Mask 01">Mask 01</MenuItem>
                            <MenuItem value={"Teddy Bear"}>Teddy Bear</MenuItem>
                            <MenuItem value={"Skull Mask 02"}>Skull Mask 02</MenuItem>
                            <MenuItem value={"Rabbit Mask"}>Rabbit Mask</MenuItem>
                            <MenuItem value={"Skull"}>Skull</MenuItem>
                            <MenuItem value="Rabbit">Rabbit</MenuItem>
                            <MenuItem value={"Casetify"}>Casetify</MenuItem>
                        </Select>)}
                        { trait == "Back 1" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                            <MenuItem value="No Back 1">No Back 1</MenuItem>
                            <MenuItem value={"Snakes"}>Snakes</MenuItem>
                            <MenuItem value={"Swords"}>Swords</MenuItem>
                            <MenuItem value="Smoke">Smoke</MenuItem>
                            <MenuItem value={"Fire"}>Fire</MenuItem>
                            <MenuItem value={"Stone Wings"}>Stone Wings</MenuItem>
                            <MenuItem value="Gothic Throne">Gothic Throne</MenuItem>
                            <MenuItem value={"Water"}>Water</MenuItem>
                            <MenuItem value={"AK47"}>AK47</MenuItem>
                            <MenuItem value="Hand of Doom">Hand of Doom</MenuItem>
                            <MenuItem value={"Palm Treen"}>Palm Tree</MenuItem>
                            <MenuItem value={"Korean Dragons"}>Korean Dragons</MenuItem>
                            <MenuItem value={"Abstract Wings"}>Abstract Wings</MenuItem>
                            <MenuItem value={"Scythe"}>Scythe</MenuItem>
                            <MenuItem value="Axes">Axes</MenuItem>
                        </Select>)}
                        { trait == "Back 2" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                            <MenuItem value="No Back 2">No Back 2</MenuItem>
                            <MenuItem value={"Torus"}>Torus</MenuItem>
                            <MenuItem value={"Horn"}>Horn</MenuItem>
                        </Select>)}
                        { trait == "Background" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                            <MenuItem value="Black">Black</MenuItem>
                            <MenuItem value={"Fashion Show"}>Fashion Show</MenuItem>
                            <MenuItem value={"Blvck Forest"}>Blvck Forest</MenuItem>
                            <MenuItem value={"Blvck World"}>Blvck World</MenuItem>
                            <MenuItem value={"Blvck Space"}>Blvck Space</MenuItem>
                            <MenuItem value={"Blvck Clouds"}>Blvck Clouds</MenuItem>
                            <MenuItem value={"Blvck Ocean"}>Blvck Ocean</MenuItem>
                            <MenuItem value={"Blvck Abstract"}>Blvck Abstract</MenuItem>
                            <MenuItem value={"Blvck City02"}>Blvck City02</MenuItem>
                            <MenuItem value={"Blvck Land"}>Blvck Land</MenuItem>
                            <MenuItem value={"Blvck City"}>Blvck City</MenuItem>
                            <MenuItem value={"Blvck City01"}>Blvck City01</MenuItem>
                            <MenuItem value={"BlvckLand"}>BlvckLand</MenuItem>
                            <MenuItem value={"Blvck City Panorama"}>Blvck City Panorama</MenuItem>
                        </Select>)}
                        { trait == "Eyes" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                            <MenuItem value="Green">Green</MenuItem>
                            <MenuItem value="Gold">Gold</MenuItem>
                            <MenuItem value="Purple">Purple</MenuItem>
                            <MenuItem value="Gray">Gray</MenuItem>
                            <MenuItem value="Red">Red</MenuItem>
                            <MenuItem value="Black">Black</MenuItem>
                            <MenuItem value="Blue">Blue</MenuItem>
                            <MenuItem value="Pink">Pink</MenuItem>
                        </Select>)}
                        { trait == "Facial Hairs" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                            <MenuItem value="No Beard">No Beard</MenuItem>
                            <MenuItem value="Beard 01">Beard 01</MenuItem>
                            <MenuItem value="Beard 02">Beard 02</MenuItem>
                            <MenuItem value="Beard 03">Beard 03</MenuItem>
                            <MenuItem value="Beard 04">Beard 04</MenuItem>
                        </Select>)}
                        { trait == "Gender" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                        </Select>)}
                        { trait == "Hair Styles" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="H8 Green">H8 Green</MenuItem>
                        <MenuItem value="H5 Green">H5 Green</MenuItem>
                        <MenuItem value="H9 Purple">H9 Purple</MenuItem>
                        <MenuItem value="H2 Green">H2 Green</MenuItem>
                        <MenuItem value="H7 Blue">H7 Blue</MenuItem>
                        <MenuItem value="H7 Purple">H7 Purple</MenuItem>
                        <MenuItem value="H10 Red">H10 Red</MenuItem>
                        <MenuItem value="H9 Blue">H9 Blue</MenuItem>
                        <MenuItem value="H9 Pink">H9 Pink</MenuItem>
                        <MenuItem value="H3 Red">H3 Red</MenuItem>
                        <MenuItem value="H5 Blue">H5 Blue</MenuItem>
                        <MenuItem value="H6 Red">H6 Red</MenuItem>
                        <MenuItem value="H1 White">H1 White</MenuItem>
                        <MenuItem value="H7 White">H7 White</MenuItem>
                        <MenuItem value="H7 Pink">H7 Pink</MenuItem>
                        <MenuItem value="H9 Green">H9 Green</MenuItem>
                        <MenuItem value="H9 White">H9 White</MenuItem>
                        <MenuItem value="H2 Purple">H2 Purple</MenuItem>
                        <MenuItem value="H5 Black">H5 Black</MenuItem>
                        <MenuItem value="H10 Green">H10 Green</MenuItem>
                        <MenuItem value="H3 Green">H3 Green</MenuItem>
                        <MenuItem value="H6 White">H6 White</MenuItem>
                        <MenuItem value="H8 Pink">H8 Pink</MenuItem>
                        <MenuItem value="H5 White">H5 White</MenuItem>
                        <MenuItem value="H9 Red">H9 Red</MenuItem>
                        <MenuItem value="H1 Green">H1 Green</MenuItem>
                        <MenuItem value="H10 Black">H10 Black</MenuItem>
                        <MenuItem value="H1 Black">H1 Black</MenuItem>
                        <MenuItem value="H1 Blue">H1 Blue</MenuItem>
                        <MenuItem value="H7 Black">H7 Black</MenuItem>
                        <MenuItem value="H8 Red">H8 Red</MenuItem>
                        <MenuItem value="H1 Pink">H1 Pink</MenuItem>
                        <MenuItem value="H10 Blue">H10 Blue</MenuItem>
                        <MenuItem value="H10 White">H10 White</MenuItem>
                        <MenuItem value="H4 Full">H4 Full</MenuItem>
                        <MenuItem value="H6 Green">H6 Green</MenuItem>
                        <MenuItem value="H2 Black">H2 Black</MenuItem>
                        <MenuItem value="H3 Blue">H3 Blue</MenuItem>
                        <MenuItem value="H3 Purple">H3 Purple</MenuItem>
                        <MenuItem value="H5 Pink">H5 Pink</MenuItem>
                        <MenuItem value="H6 Black">H6 Black</MenuItem>
                        <MenuItem value="H6 Purple">H6 Purple</MenuItem>
                        <MenuItem value="H8 Black">H8 Black</MenuItem>
                        <MenuItem value="H1 Purple">H1 Purple</MenuItem>
                        <MenuItem value="H10 Purple">H10 Purple</MenuItem>
                        <MenuItem value="H42 Bara">H42 Bars</MenuItem>
                        <MenuItem value="H3 Pink">H3 Pink</MenuItem>
                        <MenuItem value="H5 Red">H5 Red</MenuItem>
                        <MenuItem value="H2 Red">H2 Red</MenuItem>
                        <MenuItem value="H3 White">H3 White</MenuItem>
                        <MenuItem value="H5 Purple">H5 Purple</MenuItem>
                        <MenuItem value="H6 Blue">H6 Blue</MenuItem>
                        <MenuItem value="H9 Black">H9 Black</MenuItem>
                        <MenuItem value="H7Green">H7Green</MenuItem>
                        <MenuItem value="H8 Blue">H8 Blue</MenuItem>
                        <MenuItem value="H2 Blue">H2 Blue</MenuItem>
                        <MenuItem value="H2 White">H2 White</MenuItem>
                        <MenuItem value="H6 Pink">H6 Pink</MenuItem>
                        <MenuItem value="H8 White">H8 White</MenuItem>
                        <MenuItem value="H10 Pink">H10 Pink</MenuItem>
                        <MenuItem value="H8 Purple">H8 Purple</MenuItem>
                        <MenuItem value="H7 Red">H7 Red</MenuItem>
                        <MenuItem value="H1 Red">H1 Red</MenuItem>
                        <MenuItem value="H3 Black">H3 Black</MenuItem>
                        <MenuItem value="H2 Pink">H2 Pink</MenuItem>
                        <MenuItem value="H42 Bars2">H42 Bars2</MenuItem>
                        </Select>)}
                        { trait == "Hair Styles (Back)" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="No Hair Style Back">No Hair Style Back</MenuItem>
                        <MenuItem value="H1 Pink">H1 Pink</MenuItem>
                        <MenuItem value="H3 Black">H3 Black</MenuItem>
                        <MenuItem value="H1 Purple">H1 Purple</MenuItem>
                        <MenuItem value="H2 Purple">H2 Purple</MenuItem>
                        <MenuItem value="H3 Blue">H3 Blue</MenuItem>
                        <MenuItem value="H3 Purple">H3 Purple</MenuItem>
                        <MenuItem value="H2 Pink">H2 Pink</MenuItem>
                        <MenuItem value="H2 White">H2 White</MenuItem>
                        <MenuItem value="H6 Black">H6 Black</MenuItem>
                        <MenuItem value="H6 White">H6 White</MenuItem>
                        <MenuItem value="H1 White">H1 White</MenuItem>
                        <MenuItem value="H1 Green">H1 Green</MenuItem>
                        <MenuItem value="H10 Pink">H10 Pink</MenuItem>
                        <MenuItem value="H3 Green">H3 Green</MenuItem>
                        <MenuItem value="H2 Blue">H2 Blue</MenuItem>
                        <MenuItem value="H10 Black">H10 Black</MenuItem>
                        <MenuItem value="H10 Purple">H10 Purple</MenuItem>
                        <MenuItem value="H10 Red">H10 Red</MenuItem>
                        <MenuItem value="H6 Purple">H6 Purple</MenuItem>
                        <MenuItem value="H1 Red">H1 Red</MenuItem>
                        <MenuItem value="H2 Green">H2 Green</MenuItem>
                        <MenuItem value="H2 Red">H2 Red</MenuItem>
                        <MenuItem value="H3 Red">H3 Red</MenuItem>
                        <MenuItem value="H1 Black">H1 Black</MenuItem>
                        <MenuItem value="H9 Black">H9 Black</MenuItem>
                        <MenuItem value="H6 Pink">H6 Pink</MenuItem>
                        <MenuItem value="H10 White">H10 White</MenuItem>
                        <MenuItem value="H2 Black">H2 Black</MenuItem>
                        <MenuItem value="H6 Blue">H6 Blue</MenuItem>
                        <MenuItem value="H6 Green">H6 Green</MenuItem>
                        <MenuItem value="H10 Blue">H10 Blue</MenuItem>
                        <MenuItem value="H10 Green">H10 Green</MenuItem>
                        <MenuItem value="H3 White">H3 White</MenuItem>
                        <MenuItem value="H6 Red">H6 Red</MenuItem>
                        <MenuItem value="H1 Blue">H1 Blue</MenuItem>
                        <MenuItem value="H3 Pink">H3 Pink</MenuItem>
                        </Select>)}
                        { trait == "Hair Styles (Front)" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="No Hair Style Front">No Hair Style Front</MenuItem>
                        <MenuItem value="H7 Blue">H7 Blue</MenuItem>
                        <MenuItem value="H5 Purple">H5 Purple</MenuItem>
                        <MenuItem value="H5 Pink">H5 Pink</MenuItem>
                        <MenuItem value="H7 Green">H7 Green</MenuItem>
                        <MenuItem value="H8 Blue">H8 Blue</MenuItem>
                        <MenuItem value="H8 White">H8 White</MenuItem>
                        <MenuItem value="H4 Purple">H4 Purple</MenuItem>
                        <MenuItem value="H4 Black">H4 Black</MenuItem>
                        <MenuItem value="H4 White">H4 White</MenuItem>
                        <MenuItem value="H8 Black">H8 Black</MenuItem>
                        <MenuItem value="H4 Pink">H4 Pink</MenuItem>
                        <MenuItem value="H7 Purple">H7 Purple</MenuItem>
                        <MenuItem value="H5 Red">H5 Red</MenuItem>
                        <MenuItem value="H8 Green">H8 Green</MenuItem>
                        <MenuItem value="H7 Black">H7 Black</MenuItem>
                        <MenuItem value="H4 Blue">H4 Blue</MenuItem>
                        <MenuItem value="H5 White">H5 White</MenuItem>
                        <MenuItem value="H8 Purple">H8 Purple</MenuItem>
                        <MenuItem value="H5 Green">H5 Green</MenuItem>
                        <MenuItem value="H8 Pink">H8 Pink</MenuItem>
                        <MenuItem value="H4 Red">H4 Red</MenuItem>
                        <MenuItem value="H7 White">H7 White</MenuItem>
                        <MenuItem value="H4 Green">H4 Green</MenuItem>
                        <MenuItem value="H7 Pink">H7 Pink</MenuItem>
                        <MenuItem value="H5 Blue">H5 Blue</MenuItem>
                        <MenuItem value="H7 Red">H7 Red</MenuItem>
                        <MenuItem value="H5 Black">H5 Black</MenuItem>
                        <MenuItem value="H8 Red">H8 Red</MenuItem>
                        </Select>)}
                        { trait == "Outfits" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >      
                        <MenuItem value="Shirt 01">Shirt 01</MenuItem>
                        <MenuItem value="Streetwear 01">Streetwear 01</MenuItem>
                        <MenuItem value="Casual Vest">Casual Vest</MenuItem>
                        <MenuItem value="Puffer 01">Puffer 01</MenuItem>
                        <MenuItem value="Suit">Suit</MenuItem>
                        <MenuItem value="Jacket 06">Jacket 06</MenuItem>
                        <MenuItem value="Jacket 05">Jacket 05</MenuItem>
                        <MenuItem value="Puffer 03">Puffer 03</MenuItem>
                        <MenuItem value="Baseball Jacket 02">Baseball Jacket 02</MenuItem>
                        <MenuItem value="Marble Tee">Marble Tee</MenuItem>
                        <MenuItem value="Shirt 02">Shirt 02</MenuItem>
                        <MenuItem value="Streetwear 02">Streetwear 02</MenuItem>
                        <MenuItem value="Puffer 02">Puffer 02</MenuItem>
                        <MenuItem value="Jacket 07">Jacket 07</MenuItem>
                        <MenuItem value="Casual outfit">Casual outfit</MenuItem>
                        <MenuItem value="Snake Hoodie">Snake Hoodie</MenuItem>
                        <MenuItem value="Streetwear 04">Streetwear 04</MenuItem>
                        <MenuItem value="Branded Tee">Branded Tee</MenuItem>
                        <MenuItem value="Camo Jacket">Camo Jacket</MenuItem>
                        <MenuItem value="Hoodie 05">Hoodie 05</MenuItem>
                        <MenuItem value="Signature Hoodie">Signature Hoodie</MenuItem>
                        <MenuItem value="Hoodie 04">Hoodie 04</MenuItem>
                        <MenuItem value="Streetwear 03">Streetwear 03</MenuItem>
                        <MenuItem value="Casual Vest 02">Casual Vest 02</MenuItem>
                        <MenuItem value="Jacket 03">Jacket 03</MenuItem>
                        <MenuItem value="Jacket 04">Jacket 04</MenuItem>
                        <MenuItem value="Blvck Tee">Blvck Tee</MenuItem>
                        <MenuItem value="Monogram Hoodie">Monogram Hoodie</MenuItem>
                        <MenuItem value="Hoodie 03">Hoodie 03</MenuItem>
                        <MenuItem value="Jacket">Jacket</MenuItem>
                        <MenuItem value="Streetwear">Streetwear</MenuItem>
                        <MenuItem value="Laidback Jacket">Laidback Jacket</MenuItem>
                        <MenuItem value="Utility Jacket">Utility Jacket</MenuItem>
                        <MenuItem value="Baseball Jacket 01">Baseball Jacket 01</MenuItem>
                        <MenuItem value="Street wear">Street wear</MenuItem>
                        <MenuItem value="Baseball Jacket">Baseball Jacket</MenuItem>
                        <MenuItem value="Jacket 02">Jacket 02</MenuItem>
                        <MenuItem value="Belted Coat">Belted Coat</MenuItem>
                        <MenuItem value="Blvcklan Tee">Blvckland Tee</MenuItem>
                        <MenuItem value="Bold Hoodie">Bold Hoodie</MenuItem>
                        <MenuItem value="Jacket 01">Jacket 01</MenuItem>
                        <MenuItem value="Trench">Trench</MenuItem>
                        <MenuItem value="Camo Hoodie">Camo Hoodie</MenuItem>
                        <MenuItem value="Hoodie 02">Hoodie 02</MenuItem>
                        <MenuItem value="Phygital Tee 02">Phygital Tee 02</MenuItem>
                        <MenuItem value="Space Tee">Space Tee</MenuItem>
                        <MenuItem value="Hoodie">Hoodie</MenuItem>
                        <MenuItem value="Camo Tee">Camo Tee</MenuItem>
                        <MenuItem value="Phygital Tee">Phygital Tee</MenuItem>
                        <MenuItem value="Tshirt Shadowless">Tshirt Shadowless</MenuItem>
                        <MenuItem value="Jacket Leaves">Jacket Leaves</MenuItem>
                        <MenuItem value="Jacket Shadowless">Jacket Shadowless</MenuItem>
                        <MenuItem value="Hoodie Shadowless">Hoodie Shadowless</MenuItem>
                        <MenuItem value="Hoodie Stone">Hoodie Stone</MenuItem>
                        <MenuItem value="Tshirt Fur">Tshirt Fur</MenuItem>
                        <MenuItem value="Hoodie Fur">Hoodie Fur</MenuItem>
                        <MenuItem value="Puffer Shadowless">Puffer Shadowless</MenuItem>
                        <MenuItem value="Hoodie Roses">Hoodie Roses</MenuItem>
                        <MenuItem value="Cape Fur">Cape Fur</MenuItem>
                        </Select>)}
                        { trait == "Skins" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >      
                        <MenuItem value="Mixed">Mixed</MenuItem>
                        <MenuItem value="Dark">Dark</MenuItem>
                        <MenuItem value="Light">Light</MenuItem>
                        <MenuItem value="Phantoms">Phantoms</MenuItem>
                        <MenuItem value="Camo">Camo</MenuItem>
                        <MenuItem value="Robot">Robot</MenuItem>
                        <MenuItem value="Artefact">Artefact</MenuItem>
                        <MenuItem value="Shadows">Shadows</MenuItem>
                        </Select>)}
                        { trait == "Tattoo Zone A" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >      
                        <MenuItem value="No Tatoo">No Tatoo</MenuItem>
                        <MenuItem value="Candle">Candle</MenuItem>
                        <MenuItem value="All BLVCK Everything">All BLVCK Everything</MenuItem>
                        <MenuItem value="Dice">Dice</MenuItem>
                        <MenuItem value="Dagger">Dagger</MenuItem>
                        <MenuItem value="Black Cat">Black Cat</MenuItem>
                        <MenuItem value="Bird">Bird</MenuItem>
                        </Select>)}
                        { trait == "Tattoo Zone B" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >      
                        <MenuItem value="No Tatoo">No Tatoo</MenuItem>
                        <MenuItem value="Dotted">Dotted</MenuItem>
                        <MenuItem value="Blvck Paris">Blvck Paris</MenuItem>
                        <MenuItem value="Tears">Tears</MenuItem>
                        </Select>)}
                        { trait == "Tattoo Zone C" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >      
                        <MenuItem value="No Tatoo">No Tatoo</MenuItem>
                        <MenuItem value="Bones">Bones</MenuItem>
                        <MenuItem value="Mushrooms">Mushrooms</MenuItem>
                        <MenuItem value="Japanese Faith">Japanese Faith</MenuItem>
                        <MenuItem value="Queens">Queens</MenuItem>
                        <MenuItem value="Queen">Queen</MenuItem>
                        <MenuItem value="JapaneseFaith">JapaneseFaith</MenuItem>
                        </Select>)}
                        { trait == "Tattoo Zone D" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >      
                        <MenuItem value="No Tatoo">No Tatoo</MenuItem>
                        <MenuItem value="Diamonds">Diamonds</MenuItem>
                        <MenuItem value="Snake">Snake</MenuItem>
                        <MenuItem value="Fearless">Fearless</MenuItem>
                        </Select>)}
                        { trait == "Tattoo Zone E" && (<Select
                        style={{ backgoundColor: 'rgba(36, 39, 48, 1)', color: 'white' }}
                        value={traitType}
                        onChange={(e) => settraitType(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >      
                        <MenuItem value="No Tatoo">No Tatoo</MenuItem>
                        <MenuItem value="Duo">Duo</MenuItem>
                        <MenuItem value="Lines">Lines</MenuItem>
                        </Select>)}


<button onClick={(e) => {
        nftTraitSnapshot(e)
    }} disabled={snapshotProgress} className='takeSnapshot'>{!snapshotProgress ? 'Take Snapshot' : 'Taking...'}</button>
                </div>
                <div style={{ overflow: 'auto', marginTop: '40px' }} className='flex flex-col p-6 px-12 screen3:px-4 gap-y-4'>
                    <div style={{ fontSize: '24px', fontWeight: 600 }}>
                        Previous Snapshots
                    </div>
                </div>
                {allSnapshots.map((snapshot) => {
                            return <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px', marginTop: '20px' }}>
                                <span style={{ width: '180px' }}>{new Date(snapshot.createdAt).toDateString()}</span>
                                <span style={{ width: '150px' }}>{snapshot.snapshotType}</span>
                                <span style={{ width: '150px' }}>{snapshot.sortType}</span>
                                <span style={{ width: '150px' }}>{snapshot.value}</span>
                                <button onClick={(e) => {getSnapshot(e, snapshot._id)}} style={{ width: '180px', padding: '10px', background: 'grey' }}>Download CSV</button>
                            </div>
                        })}
                </div>
        </div>
    )
}

export default Snapshot
