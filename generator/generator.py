import numpy as np
from string import ascii_uppercase
from itertools import cycle
import json


def build_small_board(color, modifier, name, value=1):
    board = np.zeros((2, 2))
    if type(modifier) is int:
        mod_color = [(color + modifier) % num_colors] * 2
    elif type(modifier) is list:
        mod_color = [(color + _i) % num_colors for _i in modifier]
    else:
        kasjdfk

    board[0, 0] = color
    board[1, 1] = color
    board[0, 1] = mod_color[0]
    board[1, 0] = mod_color[1]

    full_grid = np.pad(
        board,
        ((0, 3 - board.shape[0]), (0, 3 - board.shape[1])),
        mode="constant",
        constant_values=-1,
    )
    full_grid = ",".join(np.char.mod("%d", full_grid.flatten()))
    full_feature = {"name": name, "value": value, "grid": full_grid}
    return full_feature


industries = ["defense", "healthcare", "transportation", "hospitality"]

colors_semantic = ["red", "green", "blue", "yellow", "purple"]
colors = [j for i, j in zip(colors_semantic, ascii_uppercase)]
num_colors = len(colors)

n_small_features = 5
n_medium_features = 3
n_hard_features = 2
n_total_features = n_small_features + n_medium_features + n_hard_features

all_data = []

for _industry_idx, _industry in enumerate(industries):
    f1 = build_small_board(_industry_idx, 0, "Feature 1", 1)
    f2 = build_small_board(_industry_idx, 0, "Feature 2", 2)
    f3 = build_small_board(_industry_idx, 1, "Feature 3", 3)
    f4 = build_small_board(_industry_idx, -1, "Feature 4", 4)
    f5 = build_small_board(_industry_idx, [1, -1], "Feature 5", 5)

    # all_data.extend([f1, f2, f3, f4, f5])
    all_features = [f1, f2, f3, f4, f5]

    # for idx in range(5, n_total_features):
    #     if idx < n_small_features + n_medium_features:
    #         _feature = np.zeros((2, 3))
    #         print("medium")
    #     else:
    #         _feature = np.zeros((3, 3))
    #         print("large")
    #     _feature = np.random.randint(0, num_colors, _feature.shape)
    #     _full_feature = np.pad(
    #         _feature,
    #         ((0, 3 - _feature.shape[0]), (0, 3 - _feature.shape[1])),
    #         mode="constant",
    #         constant_values=-1,
    #     )
    #     all_patterns.append(_full_feature)
    full_industry = {"name": _industry, "cards": all_features}
    all_data.append(full_industry)
    

# Write to disk
to_save = True

if to_save:
    print("Saving to disk")
    with open("all_cards.json", "w") as fptr:
        json.dump(all_data, fptr, ensure_ascii=True, indent=4)
        # flattened_patterns = [
        #     ",".join(np.char.mod("%d", _i.flatten())) + "\n" for _i in all_patterns
        # ]
        # fptr.writelines(flattened_patterns)

