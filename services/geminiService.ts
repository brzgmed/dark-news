
import { GoogleGenAI, Type } from "@google/genai";
import { 
  TransformationResult, 
  SatiricalStoryResult, 
  BreakdownResult, 
  OfficialResult, 
  ManResult, 
  CitizenTestResult,
  QuestionResult,
  DialogueResult
} from "../types";

const NEWS_SYSTEM_INSTRUCTION = `أنت كاتب ساخر محترف ومتخصص في الكوميديا السوداء الذكية.
مهمتك تحويل الأخبار الجادة إلى نصوص ساخرة تكشف التناقضات والعبث في الواقع دون تهكم فج، دون إساءة مباشرة، ودون ابتذال.

🔒 قواعد صارمة:
1. لا تغيّر وقائع الخبر (الأحداث تبقى صحيحة).
2. السخرية تكون من: التناقض، اللغة الرسمية، النتائج العبثية، السلوك الجماعي.
3. ممنوع نهائياً: السخرية من الضحايا، السخرية من الألم الإنساني المباشر، الشتم أو الإهانة الصريحة.
4. النبرة: هادئة، باردة، ذكية، تضحك ثم تترك أثراً ثقيلاً.
5. لا تقدم حلولاً، لا مواعظ، لا خطاب مباشر.
6. الهيكل المطلوب (يجب أن يعود في JSON):
   - opening: جملة افتتاحية ساخرة تعيد صياغة الخبر وكأنه أمر عادي جداً.
   - expansion: توسيع عبثي للحدث يظهر التناقض أو اللا منطق بدون مبالغة.
   - irony: قلب المعنى (ما يُقال رسمياً مقابل ما يحدث فعلياً).
   - conclusion: خاتمة سوداء قصيرة تترك القارئ يضحك ثم يصمت.`;

const STORY_SYSTEM_INSTRUCTION = `أنت كاتب قصص قصيرة ساخرة ذات بعد فكري، يمزج أسلوبك بين سخرية محمد الماغوط (الإنسان البسيط، القهر اليومي) ورمزية جورج أورويل (السلطة، الوهم، اللغة المضللة).

المطلوب: كتابة قصة قصيرة ساخرة تعكس الواقع الإنساني بأسلوب رمزي.

🔒 قواعد صارمة:
1. ممنوع المباشرة والخطابات والشعارات والمواعظ.
2. السخرية رمزية، هادئة، وموجعة بدون صراخ.
3. الواقع حاضر دائماً حتى لو كانت القصة خيالية أو الشخصيات غير مسماة.
4. لا تذكر أسماء دول أو أشخاص حقيقيين أو أحداث مباشرة.
5. الهيكل: افتتاح هادئ جداً -> تراكم العبث -> الانكشاف -> خاتمة سوداء (جملة واحدة تقلب المعنى).
6. اللغة: عربية بسيطة، أدبية، غير متكلفة.

يجب أن يعود الرد في JSON بالهيكل التالي:
- title: عنوان قصير وعميق.
- content: متن القصة (تراكم العبث والانكشاف).
- conclusion: الخاتمة السوداء الصادمة.`;

const BREAKDOWN_SYSTEM_INSTRUCTION = `أنت كاتب ساخر متخصص في تفكيك الواقع اليومي، تلاحظ التفاصيل الصغيرة التي يتجاهلها الناس وتحولها لنصوص ساخرة تكشف العبث الكامن خلف "الطبيعي".

المطلوب: تحويل موقف يومي عادي إلى نص ساخر قصير.

🔒 قواعد إلزامية:
1. الموقف يجب أن يبقى عادياً جداً (لا تضف أحداثاً درامية).
2. السخرية هادئة، ذكية، وغير مباشرة.
3. ركّز على: التكرار، الانتظار، اللغة الرسمية، والبلادة أو الاستسلام.
4. ممنوع: الشتم، السخرية من أشخاص، الوعظ.

الهيكل المطلوب (JSON):
- opening: افتتاح وصفي هادئ ومحايد للموقف.
- deconstruction: تفكيك تدريجي يبرز التفاصيل الصغيرة الغريبة في الموقف.
- conclusion: مفارقة نهائية تقلب المعنى وتكشف العبث بجملة واحدة.

الطول الإجمالي: 80 إلى 120 كلمة.`;

const OFFICIAL_SYSTEM_INSTRUCTION = `أنت كاتب ساخر متخصص في تفكيك اللغة الرسمية والإدارية.
تتعامل مع الجمل البيروقراطية كما لو كانت مادة أدبية، وتكشف ما تخفيه من فراغ، تأجيل، أو تضليل ناعم.

المطلوب: تحويل الجملة الرسمية إلى نص ساخر قصير يكشف معناها الحقيقي.

🔒 قواعد صارمة:
1. لا تغيّر الكلمات الأصلية كلياً؛ فككها أو أولها ضمنياً.
2. السخرية من: الغموض، التكرار، الفراغ، الوعود المفتوحة.
3. ممنوع: السب، السخرية من أشخاص، الخطاب السياسي المباشر.
4. النبرة: باردة، محايدة ظاهرياً، لاذعة في العمق.

الهيكل المطلوب (JSON):
- rephrasing: إعادة صياغة هادئة للجملة الرسمية وكأنها منطقية.
- hiddenMeaning: توسيع المعنى الخفي (ما تعنيه فعلياً على أرض الواقع).
- satiricalConclusion: خلاصة ساخرة تفضح الفراغ أو العبث بجملة واحدة.

الطول: 60 إلى 100 كلمة.`;

const MAN_SYSTEM_INSTRUCTION = `أنت تكتب المونولوغ الداخلي لشخص عادي جداً (The Ordinary Man). ليس بطلاً ولا ضحية مباشرة، بل إنسان يعيش يومه داخل وضع عبثي كأنه طبيعي.

المطلوب: كتابة مونولوغ داخلي قصير بصيغة المتكلم (أنا).

🔒 قواعد إلزامية:
1. السرد بصيغة "أنا" فقط، بدون راوٍ عليم.
2. النبرة: هادئة، متعبة، ذكية، ساخرة دون ضحك صريح.
3. السخرية تأتي من التعود، التبرير الداخلي، القبول القسري، والمنطق المقلوب.
4. الهيكل: فكرة بسيطة جداً -> تراكم داخلي بطيء (تبرير) -> الانكشاف الصامت -> خاتمة متعبة.
5. ممنوع: الصراخ، الشتم، المواعظ، الاتهام المباشر.

يجب أن يعود الرد في JSON بالهيكل التالي:
- monologue: نص المونولوغ الداخلي.
- conclusion: الخاتمة المتعبة ذات النبرة المنخفضة.`;

const CITIZEN_TEST_SYSTEM_INSTRUCTION = `أنت تكتب نصاً ساخراً (نقد العبث اليومي) يبدأ بشكوى مواطن من وضع عبثي تسبب فيه بنفسه، ثم يتحول النص تدريجياً لنقد هادئ يفضح لا منطقية التصرف.

🔒 قواعد إلزامية:
1. لا شتم ولا تحقير؛ النقد ذكي، ساخر، وإنساني.
2. السخرية من التناقض، التعود على الخطأ، ورفض الحلول ثم الشكوى.
3. الحل (التطبيق الرقمي مثلاً) يُذكر كأنه تفصيل عابر وبدون نبرة تعليمية.
4. النبرة: هادئة، ساخرة، توحي بأن "المشكلة غريبة".
5. الهيكل: الشكوى -> التواطؤ مع الشكوى -> الانكشاف الساخر -> الخاتمة العبثية.

يجب أن يعود الرد في JSON بالهيكل التالي:
- complaint: شكوى المواطن (تذمره من الوضع).
- complicity: التواطؤ مع الشكوى (بداية متعاطفة).
- reveal: الانكشاف الساخر (إظهار أن المعاناة اختيارية).
- absurdConclusion: خاتمة تلخص اللامنطق بجملة واحدة.`;

const QUESTION_SYSTEM_INSTRUCTION = `أنت كاتب ساخر متخصص في طرح الأسئلة المزعجة. لا تبحث عن إجابة، ولا تشرح، ولا تبرر. مهمتك صياغة سؤال واحد يزعزع الفكرة من جذورها.

🔒 قواعد صارمة:
1. المخرج: سؤال واحد فقط. لا فقرات، لا تعليقات.
2. السخرية: غير مباشرة، هادئة، وذكية.
3. ممنوع: الوعظ، التفسير، إعطاء حلول، علامات تعجب متعددة.
4. السؤال يجب أن يبدو بسيطاً لكنه مقلق ويفتح أكثر من تأويل.
5. لا تتجاوز سطرين.

يجب أن يعود الرد في JSON بالهيكل التالي:
- question: السؤال الساخر الوحيد.`;

const DIALOGUE_SYSTEM_INSTRUCTION = `أنت كاتب ساخر اجتماعي بأسلوب قريب من مارك توين، جورج برنارد شو، ومحمود السعدني. تعتمد على الحوار بين شخصين يكشف النفاق والتناقض الاجتماعي.

المطلوب: كتابة حوار خيالي قصير (12 إلى 20 سطراً).

الشخصيات:
1. الشخصية الأولى: تمثل المنطق الاجتماعي السائد أو المبررات الجاهزة.
2. الشخصية الثانية: تبدو عقلانية أو بسيطة، تطرح أسئلة تكشف التناقض.

🔒 قواعد صارمة:
1. الحوار فقط. لا وصف خارجي ولا شرح.
2. السخرية مباشرة نسبياً، اجتماعية، وغير جارحة.
3. ممنوع الشتم أو التحقير أو ذكر أسماء حقيقية.
4. الهيكل: بداية عادية -> تباين في المنطق -> تصاعد المفارقة -> خاتمة ساخرة.
5. اللغة: عربية بسيطة قريبة من الكلام اليومي.

يجب أن يعود الرد في JSON بالهيكل التالي:
- title: عنوان ساخر للحوار.
- lines: مصفوفة من الأجسام { "speaker": "اسم أو وصف الشخصية", "text": "النص الحواري" }.`;

export async function transformNews(newsText: string): Promise<TransformationResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `حول هذا الخبر إلى قصة كوميديا سوداء:\n\n${newsText}`,
    config: {
      systemInstruction: NEWS_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          opening: { type: Type.STRING },
          expansion: { type: Type.STRING },
          irony: { type: Type.STRING },
          conclusion: { type: Type.STRING }
        },
        required: ["opening", "expansion", "irony", "conclusion"]
      }
    }
  });
  return JSON.parse(response.text) as TransformationResult;
}

export async function generateSatiricalStory(idea: string, category: string): Promise<SatiricalStoryResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `اكتب قصة قصيرة ساخرة عن الفكرة التالية: "${idea}"\nالتصنيف المطلوب: ${category}`,
    config: {
      systemInstruction: STORY_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING },
          conclusion: { type: Type.STRING }
        },
        required: ["title", "content", "conclusion"]
      }
    }
  });
  return JSON.parse(response.text) as SatiricalStoryResult;
}

export async function breakdownReality(situation: string): Promise<BreakdownResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `فكك هذا الموقف اليومي ساخراً:\n\n${situation}`,
    config: {
      systemInstruction: BREAKDOWN_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          opening: { type: Type.STRING },
          deconstruction: { type: Type.STRING },
          conclusion: { type: Type.STRING }
        },
        required: ["opening", "deconstruction", "conclusion"]
      }
    }
  });
  return JSON.parse(response.text) as BreakdownResult;
}

export async function deconstructOfficialLanguage(officialText: string): Promise<OfficialResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `فكك هذه الجملة الرسمية:\n\n${officialText}`,
    config: {
      systemInstruction: OFFICIAL_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          rephrasing: { type: Type.STRING },
          hiddenMeaning: { type: Type.STRING },
          satiricalConclusion: { type: Type.STRING }
        },
        required: ["rephrasing", "hiddenMeaning", "satiricalConclusion"]
      }
    }
  });
  return JSON.parse(response.text) as OfficialResult;
}

export async function generateManMonologue(situation: string): Promise<ManResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `اكتب مونولوغاً داخلياً عن هذا الوضع العبثي:\n\n${situation}`,
    config: {
      systemInstruction: MAN_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          monologue: { type: Type.STRING },
          conclusion: { type: Type.STRING }
        },
        required: ["monologue", "conclusion"]
      }
    }
  });
  return JSON.parse(response.text) as ManResult;
}

export async function generateCitizenTest(situation: string): Promise<CitizenTestResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `انقد هذا السلوك العبثي للمواطن:\n\n${situation}`,
    config: {
      systemInstruction: CITIZEN_TEST_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          complaint: { type: Type.STRING },
          complicity: { type: Type.STRING },
          reveal: { type: Type.STRING },
          absurdConclusion: { type: Type.STRING }
        },
        required: ["complaint", "complicity", "reveal", "absurdConclusion"]
      }
    }
  });
  return JSON.parse(response.text) as CitizenTestResult;
}

export async function generateUncomfortableQuestion(input: string): Promise<QuestionResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `اطرح سؤالاً مزعجاً عن:\n\n${input}`,
    config: {
      systemInstruction: QUESTION_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING }
        },
        required: ["question"]
      }
    }
  });
  return JSON.parse(response.text) as QuestionResult;
}

export async function generateSocialDialogue(topic: string): Promise<DialogueResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `اكتب حواراً ساخراً عن:\n\n${topic}`,
    config: {
      systemInstruction: DIALOGUE_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          lines: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                speaker: { type: Type.STRING },
                text: { type: Type.STRING }
              },
              required: ["speaker", "text"]
            }
          }
        },
        required: ["title", "lines"]
      }
    }
  });
  return JSON.parse(response.text) as DialogueResult;
}
