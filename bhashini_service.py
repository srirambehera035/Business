import requests
import json
import base64
import os

class BhashiniService:
    """
    Project Bhashini (MeitY, Govt of India) Integration Client
    Supports:
      1. NMT (Translation across 22 Indic languages)
      2. ASR (Speech-to-Text for rural voice input)
      3. TTS (Text-to-Speech for voice advisory readout)
    """
    def __init__(self, user_id=None, api_key=None):
        self.user_id = user_id or os.getenv("BHASHINI_USER_ID", "SAMPLE_USER_ID")
        self.api_key = api_key or os.getenv("BHASHINI_API_KEY", "SAMPLE_API_KEY")
        self.auth_url = "https://meity-auth.ulca.bhashini.gov.in/ulca/apis/v0/model/getModelsPipeline"
        self.pipeline_endpoint = None
        self.pipeline_api_key = None

    def translate_text(self, text, source_lang="en", target_lang="or"):
        """
        Translates text between English and Indian languages (e.g., 'or' for Odia, 'hi' for Hindi).
        """
        if self.user_id == "SAMPLE_USER_ID":
            # Resilient demo fallback when API key is not yet configured
            fallbacks = {
                "or": f"[ଓଡ଼ିଆ ଅନୁବାଦ]: {text}",
                "hi": f"[हिन्दी अनुवाद]: {text}"
            }
            return fallbacks.get(target_lang, text)

        payload = {
            "pipelineTasks": [
                {
                    "taskType": "translation",
                    "config": {
                        "language": {
                            "sourceLanguage": source_lang,
                            "targetLanguage": target_lang
                        }
                    }
                }
            ],
            "inputData": {
                "input": [{"source": text}]
            }
        }
        headers = {
            "userID": self.user_id,
            "ulcaApiKey": self.api_key,
            "Content-Type": "application/json"
        }
        try:
            res = requests.post(self.auth_url, json=payload, headers=headers, timeout=10)
            data = res.json()
            # Extract translated string from pipeline response
            translated = data['pipelineResponse'][0]['output'][0]['target']
            return translated
        except Exception as e:
            print(f"Bhashini API call fallback: {e}")
            return text

    def speech_to_text(self, audio_base64, source_lang="or"):
        """
        Transcribes spoken audio (e.g. Odia/Hindi voice memo) into text.
        """
        if self.user_id == "SAMPLE_USER_ID":
            return "ମୋ ପାଖରେ ୫୦୦୦୦ ଟଙ୍କା ଅଛି, ମୁଁ କେଉଁ ବ୍ୟବସାୟ କରିପାରିବି?"  # Sample Odia audio transcription

        payload = {
            "pipelineTasks": [
                {
                    "taskType": "asr",
                    "config": {
                        "language": {"sourceLanguage": source_lang}
                    }
                }
            ],
            "inputData": {
                "audio": [{"audioContent": audio_base64}]
            }
        }
        headers = {
            "userID": self.user_id,
            "ulcaApiKey": self.api_key,
            "Content-Type": "application/json"
        }
        try:
            res = requests.post(self.auth_url, json=payload, headers=headers, timeout=15)
            data = res.json()
            return data['pipelineResponse'][0]['output'][0]['source']
        except Exception as e:
            print(f"ASR fallback: {e}")
            return ""

    def text_to_speech(self, text, target_lang="or", gender="female"):
        """
        Synthesizes advisory text into natural audio speech (returns Base64 WAV).
        """
        payload = {
            "pipelineTasks": [
                {
                    "taskType": "tts",
                    "config": {
                        "language": {"targetLanguage": target_lang},
                        "gender": gender
                    }
                }
            ],
            "inputData": {
                "input": [{"source": text}]
            }
        }
        headers = {
            "userID": self.user_id,
            "ulcaApiKey": self.api_key,
            "Content-Type": "application/json"
        }
        try:
            res = requests.post(self.auth_url, json=payload, headers=headers, timeout=15)
            data = res.json()
            return data['pipelineResponse'][0]['audio'][0]['audioContent']
        except Exception as e:
            print(f"TTS fallback: {e}")
            return None

if __name__ == '__main__':
    service = BhashiniService()
    sample = "You are eligible for a 90% concessional loan under the Term Loan Scheme."
    print("Testing Bhashini Client Wrapper:")
    print("English Source:   ", sample)
    print("Odia Translation: ", service.translate_text(sample, target_lang="or"))
    print("Hindi Translation:", service.translate_text(sample, target_lang="hi"))
