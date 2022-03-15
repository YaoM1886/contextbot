import json
with open("lateDialog", "r") as f:
    user_list = []
    bot_list=[]

    sent_lines = f.read().splitlines()
    for i in range(0, len(sent_lines)):
        if i%2==0:
            user_list.append(sent_lines[i])
        else:
            bot_list.append(sent_lines[i])

def remove_prefix(string, sent_list):
    sent_list = list(map(lambda x: x.replace(string,''), sent_list))
    sent_new_list = []
    for sent in sent_list:
        doubleQString = "{0}".format(sent)
        sent_new_list.append(doubleQString)

    with open(string+'lateDialogSent.json', 'w') as f:
        json.dump(sent_new_list ,f)

#
# remove_prefix('User: ', user_list)
# remove_prefix('Bot: ', bot_list)

print(len(user_list))
print(len(bot_list))




