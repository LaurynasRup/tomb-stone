import styled from 'styled-components';
import { ModalWrapper } from '../StyledComps/styledComponents';
import { Btn } from '../Components/Button';
import { useEffect } from 'react';
import Quagga from 'quagga';
import quaggaConfig from '../quaggaConfig.json';

export default function BarcodeModal({
	barcodeModalHandler,
	onDetected,
	result,
	setResult,
}) {
	useEffect(() => {
		const detected = (result) => {
			onDetected(result.codeResult.code, setResult);
		};
		Quagga.init(quaggaConfig, (err) => {
			if (err) {
				console.log(err, 'error msg');
			}
			Quagga.start();
			return () => {
				Quagga.stop();
			};
		});

		//detecting boxes on stream
		Quagga.onProcessed((result) => {
			var drawingCtx = Quagga.canvas.ctx.overlay,
				drawingCanvas = Quagga.canvas.dom.overlay;

			if (result) {
				if (result.boxes) {
					drawingCtx.clearRect(
						0,
						0,
						Number(drawingCanvas.getAttribute('width')),
						Number(drawingCanvas.getAttribute('height'))
					);
					result.boxes
						.filter(function (box) {
							return box !== result.box;
						})
						.forEach(function (box) {
							Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
								color: 'green',
								lineWidth: 2,
							});
						});
				}

				if (result.box) {
					Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
						color: '#00F',
						lineWidth: 2,
					});
				}

				if (result.codeResult && result.codeResult.code) {
					Quagga.ImageDebug.drawPath(
						result.line,
						{ x: 'x', y: 'y' },
						drawingCtx,
						{ color: 'red', lineWidth: 3 }
					);
				}
			}
		});

		Quagga.onDetected(detected);
		return () => {
			Quagga.stop();
		};
	}, [onDetected, setResult]);

	return (
		<ModalWrapper>
			<div className="inner">
				<h1>Barcode</h1>
				<div className="line" />
				<StyledP>{result ? result : 'Scanning...'}</StyledP>
				<MediaDiv>
					<div id="interactive" className="viewport" />
				</MediaDiv>
				<Btn handler={barcodeModalHandler}>Done</Btn>
			</div>
		</ModalWrapper>
	);
}

const MediaDiv = styled.div`
	width: 100%;
	height: 100px;
	background: black;
	margin: 1.5rem 0 1.5rem 0;
	position: relative;
	overflow: hidden;
	position: relative;

	#interactive.viewport video {
		width: 100%;
		height: 400px;
		transform: translateY(-20%);
	}

	#interactive.viewport canvas {
		width: 100%;
		height: 100%;
		position: absolute;
	}
`;

const StyledP = styled.p`
	margin: auto;
	font-size: 18px;
`;
