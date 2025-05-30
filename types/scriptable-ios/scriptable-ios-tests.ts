// TODO: write more tests

{
    const a = new Alert();
    a.title = "Some title";
    a.message = "Some message";
    const tf1 = a.addTextField("user id");
    // $ExpectType TextField
    a.addTextField("username", "pre filled text");
    // $ExpectType TextField
    a.addSecureTextField("password");
    a.addAction("OK");
    a.addCancelAction("Cancel");
    a.present();
    a.presentAlert();
    a.presentSheet();
    // $ExpectType string
    a.textFieldValue(0);

    tf1.centerAlignText();
    tf1.font = Font.systemFont(16);
    tf1.isSecure = false;
    tf1.leftAlignText();
    tf1.placeholder = "id";
    tf1.rightAlignText();
    tf1.setDecimalPadKeyboard();
    tf1.setDefaultKeyboard();
    tf1.setEmailAddressKeyboard();
    tf1.setNumberPadKeyboard();
    tf1.setNumbersAndPunctuationKeyboard();
    tf1.setPhonePadKeyboard();
    tf1.setTwitterKeyboard();
    tf1.setURLKeyboard();
    tf1.setWebSearchKeyboard();
    tf1.text = "Chuck Norris";
    tf1.textColor = Color.red();
}

{
    // TODO: args
}

{
    // @ts-expect-error
    const cError = new Calendar();
    // $ExpectType Promise<Calendar[]>
    Calendar.forReminders();
    // @ts-expect-error
    Calendar.forReminders("foo");

    // $ExpectType Promise<Calendar[]>
    Calendar.forEvents();
    // @ts-expect-error
    Calendar.forEvents("foo");

    // @ts-expect-error
    Calendar.forRemindersByTitle();
    // @ts-expect-error
    Calendar.forRemindersByTitle(42);
    // $ExpectType Promise<Calendar>
    const promise = Calendar.forRemindersByTitle("foo");

    // @ts-expect-error
    Calendar.forEventsByTitle();
    // @ts-expect-error
    Calendar.forEventsByTitle(42);
    // $ExpectType Promise<Calendar>
    Calendar.forEventsByTitle("foo");

    // @ts-expect-error
    Calendar.createForReminders();
    // @ts-expect-error
    Calendar.createForReminders(42);
    // $ExpectType Promise<Calendar>
    Calendar.createForReminders("foo");

    // @ts-expect-error
    Calendar.findOrCreateForReminders();
    // @ts-expect-error
    Calendar.findOrCreateForReminders(42);
    // $ExpectType Promise<Calendar>
    Calendar.findOrCreateForReminders("foo");

    // $ExpectType Promise<Calendar>
    Calendar.defaultForReminders();
    // @ts-expect-error
    Calendar.defaultForReminders("foo");

    // $ExpectType Promise<Calendar>
    Calendar.defaultForEvents();
    // @ts-expect-error
    Calendar.defaultForEvents("foo");

    // $ExpectType Promise<Calendar[]>
    Calendar.presentPicker();
    // @ts-expect-error
    Calendar.presentPicker("foo");
    // $ExpectType Promise<Calendar[]>
    Calendar.presentPicker(false);
    // $ExpectType Promise<Calendar[]>
    Calendar.presentPicker(true);

    promise.then(calendar => {
        // $ExpectType string
        calendar.identifier;
        calendar.identifier = "foo";
        // $ExpectType string
        calendar.title;
        calendar.title = "foo";
        // $ExpectType boolean
        calendar.isSubscribed;
        calendar.isSubscribed = true;
        // $ExpectType boolean
        calendar.allowsContentModifications;
        calendar.allowsContentModifications = true;
        // $ExpectType Color
        calendar.color;
        calendar.color = new Color("000000");

        // @ts-expect-error
        calendar.supportsAvailability();
        // @ts-expect-error
        calendar.supportsAvailability("foo");
        // $ExpectType boolean
        calendar.supportsAvailability("busy");

        // $ExpectType void
        calendar.save();
        // @ts-expect-error
        calendar.save(42);

        // $ExpectType void
        calendar.remove();
        // @ts-expect-error
        calendar.remove(42);
    });
}

{
    // TODO: CalendarEvent
}

{
    const cb = new CallbackURL("my-app://");
    cb.addParameter("foo", "bar");
    // $ExpectType Promise<Record<string, string | number | boolean | null>>
    cb.open();

    const cb2 = new CallbackURL("shortcuts://x-callback-url/");
    cb2.addParameter("foo", "bar");
    // $ExpectType Promise<{ result: string | number | boolean | null; }>
    cb2.open();
}

{
    const c = new Color("ffffff", 1);
    c.red = 42;
    c.green = 42;
    c.blue = 42;
    c.alpha = 0.42;

    // $ExpectType Color
    Color.dynamic(c, Color.black());

    // Optional alpha parameter
    // $ExpectType Color
    new Color("ffffff");
    // $ExpectType Color
    new Color("ffffff", 0.5);
    // @ts-expect-error
    new Color("ffffff", "1");
}

{
    // $ExpectType boolean
    config.runsFromHomeScreen;
    // $ExpectType boolean
    config.runsInActionExtension;
    // $ExpectType boolean
    config.runsInApp;
    // $ExpectType boolean
    config.runsInAccessoryWidget;
    // $ExpectType boolean
    config.runsInNotification;
    // $ExpectType boolean
    config.runsInWidget;
    // $ExpectType boolean
    config.runsWithSiri;
    // $ExpectType "small" | "medium" | "large" | "extraLarge" | "accessoryRectangular" | "accessoryInline" | "accessoryCircular" | null
    config.widgetFamily;
}

{
    // TODO: console
}

{
    // TODO: Contact
}

{
    // @ts-expect-error
    new ContactsContainer();

    // $ExpectType Promise<ContactsContainer>
    const promise = ContactsContainer.default();
    // $ExpectType Promise<ContactsContainer[]>
    ContactsContainer.all();
    // @ts-expect-error
    ContactsContainer.withIdentifier();
    // $ExpectType Promise<ContactsContainer>
    ContactsContainer.withIdentifier("foo");

    promise.then(container => {
        // $ExpectType string
        container.identifier;
        // $ExpectType string
        container.name;
    });
}

{
    // @ts-expect-error
    new Data();
    // $ExpectType Data
    const d = Data.fromString("bla");
    // @ts-expect-error
    Data.fromString(42);
    // $ExpectType Data
    Data.fromFile("bla");
    // @ts-expect-error
    Data.fromFile(42);
    // $ExpectType Data
    Data.fromBase64String("bla");
    // @ts-expect-error
    Data.fromBase64String(42);
    // $ExpectType Data
    Data.fromJPEG(Image.fromFile("some-image.jpg"));
    // @ts-expect-error
    Data.fromJPEG("bla");
    // @ts-expect-error
    Data.fromJPEG(42);
    // $ExpectType Data
    Data.fromPNG(Image.fromFile("some-image.jpg"));
    // @ts-expect-error
    Data.fromPNG("bla");
    // @ts-expect-error
    Data.fromPNG(42);
    // $ExpectType Data
    Data.fromBytes([0, 1, 2, 3, 4, 5, 6]);
    // @ts-expect-error
    Data.fromBytes("bla");
    // @ts-expect-error
    Data.fromBytes([0, "1", 2, 3, 4, 5, 6]);

    // $ExpectType string
    d.toRawString();
    // $ExpectType string
    d.toBase64String();
    // $ExpectType number[]
    d.getBytes();
}

{
    // TODO: DateFormatter
}

{
    // TODO: DatePicker
}

{
    // TODO: Device
}

{
    // TODO: Dictation
}

{
    // $ExpectType Promise<string[]>
    DocumentPicker.open(["public.plain-text"]);
    // $ExpectType Promise<string>
    DocumentPicker.openFile();
    // $ExpectType Promise<string>
    DocumentPicker.openFolder();

    // $ExpectType Promise<string[]>
    DocumentPicker.export("some/file.txt");
    // $ExpectType Promise<string[]>
    DocumentPicker.exportString("foo-bar");
    // $ExpectType Promise<string[]>
    DocumentPicker.exportString("foo-bar", "file.txt");
    // $ExpectType Promise<string[]>
    DocumentPicker.exportImage(Image.fromFile("some/image.png"));
    // $ExpectType Promise<string[]>
    DocumentPicker.exportImage(Image.fromFile("some/image.png"), "super interesting image.png");
    // $ExpectType Promise<string[]>
    DocumentPicker.exportData(Data.fromFile("test.bin"));
    // $ExpectType Promise<string[]>
    DocumentPicker.exportData(Data.fromFile("test.bin"), "super interesting data.bin");
}

{
    // TODO: DrawContext
}

{
    const fm = FileManager.iCloud();
    // @ts-expect-error
    const error = new FileManager();
    // $ExpectType string
    fm.documentsDirectory();
    // $ExpectType string
    fm.libraryDirectory();
    // $ExpectType string
    fm.temporaryDirectory();
    // $ExpectType string
    fm.cacheDirectory();
}

{
    const font = new Font("Helvetica", 12);
    // $ExpectType Font
    Font.largeTitle();
    // $ExpectType Font
    Font.title1();
    // $ExpectType Font
    Font.headline();
    // $ExpectType Font
    Font.body();
    // $ExpectType Font
    Font.systemFont(15);
    // $ExpectType Font
    Font.italicSystemFont(15);
    // $ExpectType Font
    Font.regularRoundedSystemFont(15);
}

{
    // TODO: Image
}

{
    // TODO: Keychain
}

{
    // TODO: LinearGradient
}

{
    const listWidget = new ListWidget();

    listWidget.backgroundColor = Color.gray();
    // @ts-expect-error
    listWidget.backgroundColor = 5;

    listWidget.backgroundImage = Image.fromFile("some/image.png");
    // @ts-expect-error
    listWidget.backgroundImage = "foo";

    const gradient = new LinearGradient();
    gradient.colors = [Color.white(), Color.gray(), Color.white()];
    // @ts-expect-error
    gradient.colors = Color.black();

    gradient.locations = [0, 0.5, 1];
    // @ts-expect-error
    gradient.locations = 1;

    gradient.startPoint = new Point(0, 1);
    // @ts-expect-error
    gradient.startPoint = 1;

    gradient.endPoint = new Point(0, 1);
    // @ts-expect-error
    gradient.endPoint = 1;

    listWidget.backgroundGradient = gradient;
    // @ts-expect-error
    listWidget.backgroundGradient = "bar";

    listWidget.addAccessoryWidgetBackground = true;
    // @ts-expect-error
    listWidget.addAccessoryWidgetBackground = 42;

    listWidget.spacing = 5;
    // @ts-expect-error
    listWidget.spacing = "5";

    listWidget.url = "https://scriptable.app";
    // @ts-expect-error
    listWidget.url = /https:\/\/scriptable.app/;

    listWidget.refreshAfterDate = new Date();
    // @ts-expect-error
    listWidget.refreshAfterDate = "2020-01-01T00:00:00Z";

    const widgetText = listWidget.addText("some text");
    // @ts-expect-error
    listWidget.addText(42);

    const widgetDate = listWidget.addDate(new Date());
    // @ts-expect-error
    listWidget.addDate("2020-01-01T00:00:00Z");

    const widgetImage = listWidget.addImage(Image.fromData(Data.fromBase64String("foobar")));
    // @ts-expect-error
    listWidget.addImage("42");

    const widgetSpacer = listWidget.addSpacer(10);
    listWidget.addSpacer();
    // @ts-expect-error
    listWidget.addSpacer("10");

    const widgetStack = listWidget.addStack();
    // @ts-expect-error
    listWidget.addStack(42);

    // $ExpectType void
    listWidget.setPadding(0, 1, 2, 3);
    // @ts-expect-error
    listWidget.setPadding("0", "1", "2", "3");

    // $ExpectType void
    listWidget.useDefaultPadding();
    // @ts-expect-error
    listWidget.useDefaultPadding("qux");

    // $ExpectType Promise<void>
    listWidget.presentSmall();
    // $ExpectType Promise<void>
    listWidget.presentMedium();
    // $ExpectType Promise<void>
    listWidget.presentLarge();
    // $ExpectType Promise<void>
    listWidget.presentExtraLarge();
    // $ExpectType Promise<void>
    listWidget.presentAccessoryCircular();
    // $ExpectType Promise<void>
    listWidget.presentAccessoryInline();
    // $ExpectType Promise<void>
    listWidget.presentAccessoryRectangular();

    Script.setWidget(listWidget);

    // $ExpectType Image
    widgetImage.image;
    widgetImage.image = Image.fromFile("some/image.png");
    // @ts-expect-error
    widgetImage.image = "42";

    // $ExpectType boolean
    widgetImage.resizable;
    widgetImage.resizable = true;
    // @ts-expect-error
    widgetImage.resizable = 1;

    // $ExpectType number
    widgetImage.imageOpacity;
    widgetImage.imageOpacity = 42;
    // @ts-expect-error
    widgetImage.imageOpacity = "42";

    // $ExpectType Size
    widgetImage.imageSize;
    widgetImage.imageSize = new Size(84, 42);
    // @ts-expect-error
    widgetImage.imageSize = [42, 42];

    // $ExpectType number
    widgetImage.cornerRadius;
    widgetImage.cornerRadius = 13;
    // @ts-expect-error
    widgetImage.cornerRadius = "13";

    // $ExpectType number
    widgetImage.borderWidth;
    widgetImage.borderWidth = 13;
    // @ts-expect-error
    widgetImage.borderWidth = "13";

    // $ExpectType Color
    widgetImage.borderColor;
    widgetImage.borderColor = Color.white();
    // @ts-expect-error
    widgetImage.borderColor = "13";

    // $ExpectType boolean
    widgetImage.containerRelativeShape;
    widgetImage.containerRelativeShape = true;
    // @ts-expect-error
    widgetImage.containerRelativeShape = 1;

    // $ExpectType Color
    widgetImage.tintColor;
    widgetImage.tintColor = Color.black();
    // @ts-expect-error
    widgetImage.tintColor = "black";

    // $ExpectType string
    widgetImage.url;
    widgetImage.url = "https://localhost:80/";
    // @ts-expect-error
    widgetImage.url = 42;

    // $ExpectType void
    widgetImage.leftAlignImage();
    // $ExpectType void
    widgetImage.centerAlignImage();
    // $ExpectType void
    widgetImage.rightAlignImage();
    // $ExpectType void
    widgetImage.applyFittingContentMode();
    // $ExpectType void
    widgetImage.applyFillingContentMode();

    // $ExpectType number
    widgetSpacer.length;
    widgetSpacer.length = 3;
    // @ts-expect-error
    widgetSpacer.length = "3";

    // $ExpectType string
    widgetText.text;
    widgetText.text = "The quick brwon fox jumps over the lazy dog";
    // @ts-expect-error
    widgetText.text = 42;

    // $ExpectType Color
    widgetText.textColor;
    widgetText.textColor = Color.black();
    // @ts-expect-error
    widgetText.textColor = 42;

    // $ExpectType Font
    widgetText.font;
    widgetText.font = Font.thinSystemFont(16);

    // $ExpectType number
    widgetText.textOpacity;
    widgetText.textOpacity = 0.9;
    // @ts-expect-error
    widgetText.textOpacity = "1";

    // $ExpectType number
    widgetText.lineLimit;
    widgetText.lineLimit = 3;
    // @ts-expect-error
    widgetText.lineLimit = "3";

    // $ExpectType number
    widgetText.minimumScaleFactor;
    widgetText.minimumScaleFactor = 3;
    // @ts-expect-error
    widgetText.minimumScaleFactor = "3";

    // $ExpectType Color
    widgetText.shadowColor;
    widgetText.shadowColor = Color.black();
    // @ts-expect-error
    widgetText.shadowColor = "black";

    // $ExpectType number
    widgetText.shadowRadius;
    widgetText.shadowRadius = 3;
    // @ts-expect-error
    widgetText.shadowRadius = "3";

    // $ExpectType Point
    widgetText.shadowOffset;
    widgetText.shadowOffset = new Point(1, 2);
    // @ts-expect-error
    widgetText.shadowOffset = [1, 2];

    // $ExpectType string
    widgetText.url;
    widgetText.url = "http://localhost/";
    // @ts-expect-error
    widgetText.url = 0;

    // $ExpectType void
    widgetText.leftAlignText();
    // $ExpectType void
    widgetText.centerAlignText();
    // $ExpectType void
    widgetText.rightAlignText();

    // $ExpectType Date
    widgetDate.date;
    widgetDate.date = new Date();
    // @ts-expect-error
    widgetDate.date = "2020-01-01T00:00:00Z";

    // $ExpectType Color
    widgetDate.textColor;
    widgetDate.textColor = Color.black();
    // @ts-expect-error
    widgetDate.textColor = "black";

    // $ExpectType Font
    widgetDate.font;
    widgetDate.font = Font.blackSystemFont(16);

    // $ExpectType number
    widgetDate.textOpacity;
    widgetDate.textOpacity = 0.4;
    // @ts-expect-error
    widgetDate.textOpacity = "1";

    // $ExpectType number
    widgetDate.lineLimit;
    widgetDate.lineLimit = 42;
    // @ts-expect-error
    widgetDate.lineLimit = "42";

    // $ExpectType number
    widgetDate.minimumScaleFactor;
    widgetDate.minimumScaleFactor = 0.01;
    // @ts-expect-error
    widgetDate.minimumScaleFactor = "42";

    // $ExpectType Color
    widgetDate.shadowColor;
    widgetDate.shadowColor = Color.gray();
    // @ts-expect-error
    widgetDate.shadowColor = "gray";

    // $ExpectType number
    widgetDate.shadowRadius;
    widgetDate.shadowRadius = 42;
    // @ts-expect-error
    widgetDate.shadowRadius = "42";

    // $ExpectType Point
    widgetDate.shadowOffset;
    widgetDate.shadowOffset = new Point(42, 42);
    // @ts-expect-error
    widgetDate.shadowOffset = [42, 42];

    // $ExpectType string
    widgetDate.url;
    widgetDate.url = "http://localhost:80/";
    // @ts-expect-error
    widgetDate.url = 42;

    // $ExpectType void
    widgetDate.leftAlignText();
    // $ExpectType void
    widgetDate.centerAlignText();
    // $ExpectType void
    widgetDate.rightAlignText();
    // $ExpectType void
    widgetDate.applyTimeStyle();
    // $ExpectType void
    widgetDate.applyDateStyle();
    // $ExpectType void
    widgetDate.applyRelativeStyle();
    // $ExpectType void
    widgetDate.applyOffsetStyle();
    // $ExpectType void
    widgetDate.applyTimerStyle();

    // $ExpectType Color
    widgetStack.backgroundColor;
    widgetStack.backgroundColor = Color.black();
    // @ts-expect-error
    widgetStack.backgroundColor = "black";

    // $ExpectType Image
    widgetStack.backgroundImage;
    widgetStack.backgroundImage = Image.fromFile("some/file.png");
    // @ts-expect-error
    widgetStack.backgroundImage = "black";

    // $ExpectType LinearGradient
    widgetStack.backgroundGradient;
    widgetStack.backgroundGradient = new LinearGradient();
    // @ts-expect-error
    widgetStack.backgroundGradient = 42;

    // $ExpectType number
    widgetStack.spacing;
    widgetStack.spacing = 42;
    // @ts-expect-error
    widgetStack.spacing = "42";

    // $ExpectType Size
    widgetStack.size;
    widgetStack.size = new Size(4, 2);
    // @ts-expect-error
    widgetStack.size = [4, 2];

    // $ExpectType number
    widgetStack.cornerRadius;
    widgetStack.cornerRadius = 10;
    // @ts-expect-error
    widgetStack.cornerRadius = "10";

    // $ExpectType number
    widgetStack.borderWidth;
    widgetStack.borderWidth = 3;
    // @ts-expect-error
    widgetStack.borderWidth = "3";

    // $ExpectType Color
    widgetStack.borderColor;
    widgetStack.borderColor = Color.black();
    // @ts-expect-error
    widgetStack.borderColor = "black";

    // $ExpectType string
    widgetStack.url;
    widgetStack.url = "http://localhost:80/";
    // @ts-expect-error
    widgetStack.url = 21;

    // $ExpectType WidgetText
    widgetStack.addText("foo");
    // $ExpectType WidgetDate
    widgetStack.addDate(new Date());
    // $ExpectType WidgetImage
    widgetStack.addImage(Image.fromFile("some/image.png"));
    // $ExpectType WidgetSpacer
    widgetStack.addSpacer(4);
    // $ExpectType WidgetSpacer
    widgetStack.addSpacer();
    // $ExpectType WidgetStack
    widgetStack.addStack();
    // $ExpectType void
    widgetStack.setPadding(0, 1, 2, 3);
    // $ExpectType void
    widgetStack.useDefaultPadding();
    // $ExpectType void
    widgetStack.topAlignContent();
    // $ExpectType void
    widgetStack.centerAlignContent();
    // $ExpectType void
    widgetStack.bottomAlignContent();
    // $ExpectType void
    widgetStack.layoutHorizontally();
    // $ExpectType void
    widgetStack.layoutVertically();
}

{
    // $ExpectType Promise<CurrentLocation>
    Location.current();
    // $ExpectType Promise<GeocodeSummary[]>
    Location.reverseGeocode(0, 0);
    // $ExpectType Promise<GeocodeSummary[]>
    Location.reverseGeocode(0, 0, "en");
}

{
    // TODO: Mail
}

{
    // TODO: Message
}

{
    // TODO: module
}

{
    const notification = new Notification();

    // $ExpectType string
    notification.identifier;
    notification.identifier = "test-identifier";
    // @ts-expect-error
    notification.identifier = 0;
    // @ts-expect-error
    notification.identifier = null;

    // $ExpectType string
    notification.title;
    notification.title = "test-title";
    // @ts-expect-error
    notification.title = 0;
    // @ts-expect-error
    notification.title = null;

    // $ExpectType string
    notification.subtitle;
    notification.subtitle = "test-subtitle";
    // @ts-expect-error
    notification.subtitle = 0;
    // @ts-expect-error
    notification.subtitle = null;

    // $ExpectType string
    notification.body;
    notification.body = "test-body";
    // @ts-expect-error
    notification.body = 0;
    // @ts-expect-error
    notification.body = null;

    // $ExpectType number | null
    notification.preferredContentHeight;
    notification.preferredContentHeight = 100;
    notification.preferredContentHeight = null;
    // @ts-expect-error
    notification.preferredContentHeight = "100";

    // $ExpectType number | null
    notification.badge;
    notification.badge = 5;
    notification.badge = null;
    // @ts-expect-error
    notification.badge = "5";

    // $ExpectType string
    notification.threadIdentifier;
    notification.threadIdentifier = "test-thread";
    // @ts-expect-error
    notification.threadIdentifier = 0;
    // @ts-expect-error
    notification.threadIdentifier = null;

    // $ExpectType "default" | "accept" | "alert" | "complete" | "event" | "failure" | "piano_error" | "piano_success" | "popup" | null
    notification.sound;
    notification.sound = "accept";
    notification.sound = null;
    // @ts-expect-error
    notification.sound = 0;
    // @ts-expect-error
    notification.sound = "";

    // $ExpectType string | null
    notification.openURL;
    notification.openURL = "https://example.com";
    notification.openURL = null;
    // @ts-expect-error
    notification.openURL = 0;

    // $ExpectType Date | null
    notification.deliveryDate;
    // @ts-expect-error
    notification.deliveryDate = new Date();

    // $ExpectType Date | null
    notification.nextTriggerDate;
    // @ts-expect-error
    notification.nextTriggerDate = new Date();

    // $ExpectType string | null
    notification.scriptName;
    notification.scriptName = "test-script";
    notification.scriptName = null;
    // @ts-expect-error
    notification.scriptName = 0;

    // $ExpectType readonly Action[]
    notification.actions;
    // @ts-expect-error
    notification.actions = [];
    // @ts-expect-error
    notification.actions.push({} as unknown as Notification.Action);
}

{
    // TODO: Pasteboard
}

{
    // TODO: Path
}

{
    // TODO: Photos
}

{
    // TODO: Point
}

{
    // TODO: QuickLook
}

{
    // TODO: Rect
}

{
    // TODO: RecurrenceRule
}

{
    // TODO: RelativeDateTimeFormatter
}

{
    const r = new Reminder();
    // $ExpectType Calendar
    r.calendar;
    // $ExpectType Date | null
    r.completionDate;
    // $ExpectType Date | null
    r.creationDate;
    // $ExpectType Date | null
    r.dueDate;
    // $ExpectType boolean
    r.dueDateIncludesTime;
    // $ExpectType string
    r.identifier;
    // $ExpectType boolean
    r.isCompleted;
    // $ExpectType boolean
    r.isOverdue;
    // $ExpectType string | undefined
    r.notes;
    delete r.notes;
    // $ExpectType number
    r.priority;
    // $ExpectType string
    r.title;

    // $ExpectType void
    r.remove();
    // @ts-expect-error
    r.remove("foo");
    // $ExpectType void
    r.removeAllRecurrenceRules();
    // @ts-expect-error
    r.removeAllRecurrenceRules("foo");
    // $ExpectType void
    r.save();
    // @ts-expect-error
    r.save("foo");

    // @ts-expect-error
    const noRule = new RecurrenceRule();
    const rule = RecurrenceRule.daily(1);
    r.addRecurrenceRule(rule);
    // @ts-expect-error
    r.addRecurrenceRule("foo");
}

{
    const url = "http://httpbin.org/POST";
    const req = new Request(url);
    req.url === url;
    req.method = "POST";
    req.headers = {
        "Content-Type": "application/json",
    };
    req.body = "{\"answer\":42}";
    req.timeoutInterval = 5;
    req.allowInsecureRequest = true;
    // $ExpectType Promise<any>
    const res = req.loadJSON();
    res.then(() => {});
}

{
    const sf = SFSymbol.named("car");
    // @ts-expect-error
    const err = new SFSymbol();

    // $ExpectType void
    sf.applyFont(Font.blackSystemFont(16));
    // $ExpectType void
    sf.applyUltraLightWeight();
    // $ExpectType void
    sf.applyThinWeight();
    // $ExpectType void
    sf.applyLightWeight();
    // $ExpectType void
    sf.applyRegularWeight();
    // $ExpectType void
    sf.applyMediumWeight();
    // $ExpectType void
    sf.applySemiboldWeight();
    // $ExpectType void
    sf.applyBoldWeight();
    // $ExpectType void
    sf.applyHeavyWeight();
    // $ExpectType void
    sf.applyBlackWeight();
}

{
    // TODO: Safari
}

{
    // TODO: Script
}

{
    // @ts-expect-error
    ShareSheet.present("foobar");
    // @ts-expect-error
    ShareSheet.present(42);
    // $ExpectType Promise<ShareSheetResult>
    ShareSheet.present([]);
    // $ExpectType Promise<ShareSheetResult>
    ShareSheet.present(["test"]);
    // $ExpectType Promise<ShareSheetResult>
    ShareSheet.present([42]);
}

{
    // TODO: Size
}

{
    // TODO: Speech
}

{
    // TODO: TextField
}

{
    // TODO: Timer
}

{
    // TODO: UITable
}

{
    // TODO: UITableCell
}

{
    // TODO: UITableRow
}

{
    // TODO: URLScheme
}

{
    // TODO: UUID
}

{
    // TODO: WebView
}

{
    // TODO: WidgetDate
}

{
    // TODO: WidgetImage
}

{
    // TODO: WidgetSpacer
}

{
    // TODO: WidgetStack
}

{
    // TODO: WidgetText
}

{
    // TODO: XMLParser
}

{
    // TODO: log
}

{
    // TODO: logWarning
}

{
    // TODO: logError
}

{
    // TODO: atob
}

{
    // TODO: btoa
}

{
    // TODO: importModule
}
