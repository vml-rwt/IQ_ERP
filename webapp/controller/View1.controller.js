sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("speechRecognition.controller.View1", {

		onInit: function() {
			this._oSubscribedEventModel = new sap.ui.model.odata.ODataModel("/ZFTS/iERP/xs/",
				true);
		},

		onBtnPrs: function(oEvent) {
			var _this = this;
			if ('webkitSpeechRecognition' in window) {
				var speechRecognizer = new webkitSpeechRecognition();
				speechRecognizer.continuous = true;
				speechRecognizer.interimResults = true;
				speechRecognizer.lang = 'en-IN';
				speechRecognizer.start();
				// jQuery.sap.delayedCall(800, this, function() { // this has to be implemented so as the control comes back after 5 seconds
				// 	speechRecognizer.stop();
				// });
				var finalTranscripts = '';
				speechRecognizer.onresult = function(event) {
					var interimTranscripts = '';
					for (var i = event.resultIndex; i < event.results.length; i++) {
						var transcript = event.results[i][0].transcript;
						transcript.replace("\n", "<br>");
						if (event.results[i].isFinal) {
							finalTranscripts += transcript;
						} else {
							interimTranscripts += transcript;
						}
					}
					var shellInput = _this.getView().byId("idChatInput").setValue(finalTranscripts);
					shellInput.focus();
				};

				//on end of speech recognition
				speechRecognizer.onend = function(oEvent) {
					var sUserSpeech = this.getView().byId("idChatInput").getValue();
					var sSystem = "";
					if (sUserSpeech) {

						this.fnAnalyse(sUserSpeech);

					} else {
						var msg = new SpeechSynthesisUtterance();
						// Set the text.
						msg.text = "Please Try Again";
						var synth = window.speechSynthesis;
						synth.speak(msg);
					}
				};

			}
		},

		fnAnalyse: function(sUserInput) {
			var _this = this;
			var input = [];
			input.push(sUserInput);
			var oPostData = {
				"speech": sUserInput
			};
			var aUrl = '/iERP/xs/SendVoiceText.xsjs';
			jQuery.ajax({
				url: aUrl,
				method: 'POST',
				dataType: 'json',
				data: JSON.stringify(oPostData),
				success: this.onSuccess.bind(_this),
				error: this.onError

			});
		},
		onSuccess: function(success) {
			var oResponse = success.result;
			this.getView().byId("idTextArea").setValue(oResponse);

		},
		onError: function(error) {
			console.log("error");
		},
		onPostPrs: function() {
			var sMsg = this.getView().byId("idChatInput").getValue();
			this.fnAnalyse(sMsg);
		},

		speak: function(output) {
			var oSpeaker = new SpeechSynthesisUtterance();
			oSpeaker.text = output;
			var synth = window.speechSynthesis;
			synth.speak(oSpeaker);
		}
	});
});